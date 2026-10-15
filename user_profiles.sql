-- user_profiles tablosu
-- Kullanıcıların profil bilgilerini users tablosundan ayrı tutar

CREATE TABLE IF NOT EXISTS `user_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `display_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `cover_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '/default_cover.jpg',
  `global_tag` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `about` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_user_profiles_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Mevcut kullanıcılar için varsayılan profil kayıtları
INSERT INTO `user_profiles` (`user_id`, `display_name`, `bio`, `cover_image`, `global_tag`, `about`) VALUES
(1, 'Naganen', 'Merhaba! Telgraf kullanıyorum.', '/default_cover.jpg', '#yeni', '{"konum": "", "dogumTarihi": "", "websitesi": ""}'),
(2, 'Patates', 'Merhaba! Telgraf kullanıyorum.', '/default_cover.jpg', '#yeni', '{"konum": "", "dogumTarihi": "", "websitesi": ""}');

