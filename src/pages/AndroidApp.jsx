import { useState } from "react";
import React from "react"; // برای React.Fragment
import image1 from '../assets/YY.png';
import image2 from '../assets/p2.png';
import video1 from '../assets/v1.mp4';

export default function AndroidApp() {
  // مقدار اولیه کارت‌ها
  const initialCards = [
    {
      title: "اپلیکیشن ScoreBoard",
      desc: "یک اپلیکیشن بسیار کاربردی برای نمایش و ویرایش امتیاز مخصوص ورزشگاه ها، کاملا لوکال و پیشرفته. لطفا جهت خرید یا سفارش تماس بگیرید.",
      image: image1,
      video: video1,
    },
    {
      title: "اپلیکیشن فروشگاهی کدبانو",
      desc: "خرید راحت و بدون دردسر از سراسر کشور",
      image: image2,
    },
    {
      title: "اپلیکیشن آموزشی",
      desc: "یادگیری مهارت‌ها با ویدیو",
      image: "/assets/3.png",
    },
    {
      title: "اپلیکیشن پزشکی",
      desc: "نوبت‌دهی و مشاوره آنلاین",
      image: "/assets/4.png",
    },
  ];

  const [cards] = useState(initialCards);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-700 dark:text-blue-400">
          اپلیکیشن‌های اندرویدی
        </h1>

        <div className="col-span-full my-12 border-t border-gray-300 dark:border-gray-700"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <React.Fragment key={index}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden w-full">
                {/* تصویر اصلی بالا */}
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-106 object-cover"
                  />
                )}

                <div className="p-6 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>

                  {/* ویدیو در پایین کارت (اگر وجود داشت) */}
                  {card.video && (
                    <video
                      controls
                      className="w-full h-90 object-cover rounded-lg"
                    >
                      <source src={card.video} type="video/mp4" />
                    </video>
                  )}
                </div>
              </div>

              {index === 2 && (
                <div className="col-span-full my-12 border-t border-gray-300 dark:border-gray-700"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}
