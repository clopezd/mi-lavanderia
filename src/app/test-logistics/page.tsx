import RequestCollectionForm from "@/features/logistics/components/RequestCollectionForm";

export default function TestLogisticsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">App de Logística de Lavandería</h1>
                    <p className="text-gray-500 mt-2">Prueba de la pantalla de Solicitud de Recogida (PRP V1)</p>
                </div>

                <RequestCollectionForm />
            </div>
        </div>
    );
}
