"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLogisticsOrder } from "@/features/logistics/services/logisticsService";

export default function RequestCollectionForm() {
    const router = useRouter();
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [isPending, startTransition] = useTransition();
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        startTransition(async () => {
            const result = await createLogisticsOrder({
                address,
                notes,
                date,
                timeSlot,
            });

            if (result.error) {
                setErrorMsg(result.error);
                return;
            }

            router.push('/dashboard');
        });
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-8 shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Programar Recogida</CardTitle>
                <p className="text-sm text-white/50 mt-1">
                    Indícanos dónde y cuándo recogemos tu ropa sucia.
                </p>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                            Error: {errorMsg}
                        </div>
                    )}
                    {/* Ubicación */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            📍 ¿Dónde buscamos tu ropa?
                        </h3>
                        <div className="space-y-2">
                            <label htmlFor="address" className="text-sm font-medium">
                                Dirección completa *
                            </label>
                            <Input
                                id="address"
                                placeholder="Ej. Av. Siempre Viva 742, Depto 3A"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium">
                                Instrucciones extra (Opcional)
                            </label>
                            <Input
                                id="notes"
                                placeholder="Ej. Tocar el timbre de servicio"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Fecha y Hora */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            🗓️ ¿Cuándo pasamos?
                        </h3>

                        <div className="space-y-2">
                            <label htmlFor="date" className="text-sm font-medium">
                                Fecha programada *
                            </label>
                            {/* Fallback to date input for now, replacing proper DatePicker for speed */}
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="text-sm font-medium block">
                                🕒 Franja Horaria (Selecciona una) *
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                                {["Mañana (09:00 - 13:00)", "Tarde (14:00 - 18:00)"].map((slot) => (
                                    <label
                                        key={slot}
                                        className={`
                      border rounded-md px-4 py-3 cursor-pointer transition-colors
                      flex items-center gap-3
                      ${timeSlot === slot ? "border-primary bg-primary/5 text-primary" : "border-gray-200 hover:border-gray-300"}
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="timeSlot"
                                            value={slot}
                                            checked={timeSlot === slot}
                                            onChange={(e) => setTimeSlot(e.target.value)}
                                            className="w-4 h-4 text-primary"
                                            required
                                        />
                                        <span className="font-medium text-sm">{slot}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-2">
                    <Button
                        type="submit"
                        className="w-full text-md py-6"
                        disabled={!address || !date || !timeSlot || isPending}
                    >
                        {isPending ? "Procesando..." : "CONFIRMAR Y SOLICITAR RECOGIDA"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
