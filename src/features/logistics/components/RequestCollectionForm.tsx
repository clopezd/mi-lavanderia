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
        <Card className="w-full max-w-md mx-auto mt-8 border-transparent bg-neu-bg shadow-neu rounded-3xl overflow-hidden">
            <CardHeader className="bg-neu-bg pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800">Programar Recogida</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                    Indícanos dónde y cuándo recogemos tu ropa sucia.
                </p>
            </CardHeader>

            <form onSubmit={handleSubmit} className="bg-neu-bg">
                <CardContent className="space-y-6 pt-4">
                    {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm shadow-neu-inset">
                            Error: {errorMsg}
                        </div>
                    )}
                    {/* Ubicación */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                            📍 ¿Dónde buscamos tu ropa?
                        </h3>
                        <div className="space-y-2">
                            <label htmlFor="address" className="text-sm font-medium text-gray-600">
                                Dirección completa *
                            </label>
                            <Input
                                id="address"
                                placeholder="Ej. Av. Siempre Viva 742, Depto 3A"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="bg-neu-bg border-transparent shadow-neu-inset focus-visible:ring-cyan-500 text-gray-700 placeholder:text-gray-400 rounded-xl h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium text-gray-600">
                                Instrucciones extra (Opcional)
                            </label>
                            <Input
                                id="notes"
                                placeholder="Ej. Tocar el timbre de servicio"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="bg-neu-bg border-transparent shadow-neu-inset focus-visible:ring-cyan-500 text-gray-700 placeholder:text-gray-400 rounded-xl h-12"
                            />
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Fecha y Hora */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                            🗓️ ¿Cuándo pasamos?
                        </h3>

                        <div className="space-y-2">
                            <label htmlFor="date" className="text-sm font-medium text-gray-600">
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
                                className="bg-neu-bg border-transparent shadow-neu-inset focus-visible:ring-cyan-500 text-gray-700 rounded-xl h-12"
                            />
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="text-sm font-medium block text-gray-600">
                                🕒 Franja Horaria (Selecciona una) *
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                                {["Mañana (09:00 - 13:00)", "Tarde (14:00 - 18:00)"].map((slot) => (
                                    <label
                                        key={slot}
                                        className={`
                      rounded-xl px-4 py-3 cursor-pointer transition-shadow
                      flex items-center gap-3 bg-neu-bg border border-transparent
                      ${timeSlot === slot ? "shadow-neu-inset text-cyan-600" : "shadow-neu text-gray-600 hover:shadow-neu-inset"}
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="timeSlot"
                                            value={slot}
                                            checked={timeSlot === slot}
                                            onChange={(e) => setTimeSlot(e.target.value)}
                                            className="w-4 h-4 text-cyan-600 bg-neu-bg border-transparent shadow-neu-inset focus:ring-cyan-500"
                                            required
                                        />
                                        <span className="font-medium text-sm">{slot}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-6 pb-8 bg-neu-bg">
                    <Button
                        type="submit"
                        className="w-full text-md py-6 bg-neu-bg text-cyan-600 font-bold rounded-2xl shadow-neu hover:shadow-neu-inset hover:bg-neu-bg active:shadow-neu-inset transition-shadow border border-transparent hover:text-cyan-700 disabled:opacity-50 disabled:shadow-none disabled:bg-gray-100"
                        disabled={!address || !date || !timeSlot || isPending}
                    >
                        {isPending ? "Procesando..." : "CONFIRMAR Y SOLICITAR RECOGIDA"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
