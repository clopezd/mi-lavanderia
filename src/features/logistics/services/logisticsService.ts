"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { OrderStatus, AdminMetrics } from "../types";

export async function createLogisticsOrder(data: {
    address: string;
    notes: string;
    date: string;
    timeSlot: string;
}) {
    const supabase = await createClient();

    const { data: authData, error: userError } = await supabase.auth.getUser();

    if (userError || !authData?.user) {
        return { error: "Usuario no autenticado" };
    }

    const finalNotes = data.notes
        ? `Franja: ${data.timeSlot} | ${data.notes}`
        : `Franja: ${data.timeSlot}`;

    const collectionDate = new Date(`${data.date}T12:00:00Z`).toISOString();

    const { data: order, error } = await supabase
        .from('orders')
        .insert({
            client_id: authData.user.id,
            status: 'PENDIENTE',
            source: 'web',
            collection_address: data.address,
            collection_date: collectionDate,
            collection_notes: finalNotes,
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating record in Supabase:", error);
        return { error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true, order };
}

export async function getClientOrders(clientId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching client orders:", error);
        return { error: error.message, orders: [] };
    }

    return { orders: data ?? [] };
}

export async function getAllOrders(filters?: {
    status?: OrderStatus;
    date?: string;
}) {
    const supabase = await createClient();

    let query = supabase
        .from('orders')
        .select('*, profiles(full_name, phone)')
        .order('created_at', { ascending: false });

    if (filters?.status) {
        query = query.eq('status', filters.status);
    }

    if (filters?.date) {
        const start = new Date(filters.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filters.date);
        end.setHours(23, 59, 59, 999);
        query = query
            .gte('created_at', start.toISOString())
            .lte('created_at', end.toISOString());
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching all orders:", error);
        return { error: error.message, orders: [] };
    }

    return { orders: data ?? [] };
}

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    const supabase = await createClient();

    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) return { error: "No autenticado" };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: "Sin permisos" };
    }

    const { data: order, error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

    if (error) {
        console.error("Error updating order status:", error);
        return { error: error.message };
    }

    return { success: true, order };
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
    const supabase = await createClient();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [totalToday, pending, inProgress, deliveredToday] = await Promise.all([
        supabase
            .from('orders')
            .select('id', { count: 'exact', head: true })
            .gte('created_at', todayStart.toISOString())
            .lte('created_at', todayEnd.toISOString()),
        supabase
            .from('orders')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'PENDIENTE'),
        supabase
            .from('orders')
            .select('id', { count: 'exact', head: true })
            .in('status', ['RECOGIDO', 'LAVANDO', 'LISTO']),
        supabase
            .from('orders')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'ENTREGADO')
            .gte('updated_at', todayStart.toISOString())
            .lte('updated_at', todayEnd.toISOString()),
    ]);

    return {
        total_today: totalToday.count ?? 0,
        pending: pending.count ?? 0,
        in_progress: inProgress.count ?? 0,
        delivered_today: deliveredToday.count ?? 0,
    };
}
