"use client";

import Image from "next/image";

const combos = [
    {
        name: "Pizza & Drink Combo",
        description: "Delicious pizza with a refreshing drink.",
        price: 12.99,
        image: "/images/pizza-combo.jpg",
    },
    {
        name: "Burger & Fries Combo",
        description: "Juicy burger with crispy fries.",
        price: 10.49,
        image: "/images/burger-combo.jpg",
    },
    {
        name: "Pasta Special Combo",
        description: "Creamy pasta with garlic bread.",
        price: 14.99,
        image: "/images/pasta-combo.jpg",
    },
];

export default function MenuCarousel() {
    return (
        <main className="p-10 w-auto -z-10">
            <h1 className="text-3xl font-bold mb-4">Combo Offers</h1>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {combos.map((combo, index) => (
                    <SwiperSlide key={index}>
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <Image
                                src={combo.image}
                                alt={combo.name}
                                width={300}
                                height={200}
                                className="rounded"
                            />
                            <h2 className="text-xl font-semibold mt-2">
                                {combo.name}
                            </h2>
                            <p className="text-gray-600">{combo.description}</p>
                            <p className="text-blue-600 font-bold mt-2">
                                ${combo.price}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </main>
    );
}
