import React from 'react';

const ConsultationPackages = () => {
    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4 text-purple">Пакет консультаций</h2>
            <p className="mb-4 text-gray-700">
                Индивидуальный пакет для долгосрочного консультирования. Серия сессий, направленных на систематическую работу с вашими эмоциональными и психологическими запросами. Постепенно, через регулярные встречи, мы глубже погружаемся в причины проблем, формируем устойчивые решения, вместе движемся к долгосрочным изменениям для улучшения качества жизни.
            </p>

            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-lightPurple">
                        <th className="px-4 py-2 border">Количество консультаций</th>
                        <th className="px-4 py-2 border">Продолжительность</th>
                        <th className="px-4 py-2 border">Стоимость (грн)</th>
                        <th className="px-4 py-2 border">Стоимость (zł)</th>
                        <th className="px-4 py-2 border">Стоимость (евро)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 border text-center">4 консультации</td>
                        <td className="px-4 py-2 border text-center">50 минут</td>
                        <td className="px-4 py-2 border text-center">3700 грн</td>
                        <td className="px-4 py-2 border text-center">370 zł</td>
                        <td className="px-4 py-2 border text-center">85 евро</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border text-center">8 консультаций</td>
                        <td className="px-4 py-2 border text-center">50 минут</td>
                        <td className="px-4 py-2 border text-center">7200 грн</td>
                        <td className="px-4 py-2 border text-center">720 zł</td>
                        <td className="px-4 py-2 border text-center">160 евро</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 border text-center">12 консультаций</td>
                        <td className="px-4 py-2 border text-center">50 минут</td>
                        <td className="px-4 py-2 border text-center">10 500 грн</td>
                        <td className="px-4 py-2 border text-center">1050 zł</td>
                        <td className="px-4 py-2 border text-center">235 евро</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ConsultationPackages;
