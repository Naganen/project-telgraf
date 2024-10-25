-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 25 Eki 2024, 11:24:43
-- Sunucu sürümü: 8.0.17
-- PHP Sürümü: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `pp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/default.jpg',
  `usertoken` text NOT NULL,
  `friends` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `lastchats` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `notifications` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `settings` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `pp`, `usertoken`, `friends`, `lastchats`, `notifications`, `settings`) VALUES
(1, 'naganen', '$2y$10$YDLQlZBoZ4mYjW1FRuQSvexp0xlRG9xJ0hoErIWiwvH.pFnviIkcm', '/default.jpg', '$2y$10$CFJxI28lY6BePXeicItOhe7srL6LaTZoqygz3ay07QDuYDY.O75AO', '2', '', '', ''),
(2, 'patates', '$2y$10$9BEqdJEl8e8/5oYgIhoT9u8wKjCm/Afq9V3y15e/JfZgEcVolSNdK', '/default.jpg', '$2y$10$iTSNpThYO0247ACSpj0ttutZ3mFaFdQkNLygay1IkoNSOGaWSrZfO', '1', '', '', '');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
