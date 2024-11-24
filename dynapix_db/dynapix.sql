-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 24, 2024 at 10:30 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dynapix`
--

-- --------------------------------------------------------

--
-- Table structure for table `dypx_media_ad_location`
--

DROP TABLE IF EXISTS `dypx_media_ad_location`;
CREATE TABLE IF NOT EXISTS `dypx_media_ad_location` (
  `md_ad_id` int NOT NULL AUTO_INCREMENT,
  `md_id` int DEFAULT NULL,
  `md_ad_name` varchar(255) DEFAULT NULL,
  `md_ad_type` enum('Digital') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Digital',
  `md_ad_num_screen` varchar(255) DEFAULT NULL,
  `md_ad_num_slots` varchar(255) DEFAULT NULL,
  `md_ad_num_duration` varchar(255) DEFAULT NULL,
  `md_ad_footfalls` varchar(255) DEFAULT NULL,
  `md_ad_size` varchar(255) DEFAULT NULL,
  `md_ad_looptime` varchar(255) DEFAULT NULL,
  `md_ad_status` tinyint(1) NOT NULL,
  `md_ad_image` text,
  `md_ad_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`md_ad_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dypx_media_ad_location`
--

INSERT INTO `dypx_media_ad_location` (`md_ad_id`, `md_id`, `md_ad_name`, `md_ad_type`, `md_ad_num_screen`, `md_ad_num_slots`, `md_ad_num_duration`, `md_ad_footfalls`, `md_ad_size`, `md_ad_looptime`, `md_ad_status`, `md_ad_image`, `md_ad_created_date`) VALUES
(1, 1, 'testes', 'Digital', '20', '20', '20', '20', '20', '20', 0, 'uploads/1732072907227_download_(2).jpg', '2024-11-20 03:21:47'),
(2, 8, 'new location here', 'Digital', '20', '20', '20', '20', '2020', '20', 0, 'uploads/1732127144815_person-with-backpack-gun-middle-picture_1137054-331.avif', '2024-11-20 18:25:44'),
(3, 7, 'test', 'Digital', '20', '20', '20', '20', '120', '20', 0, 'uploads/1732127274057_dabur-vatika-enriched-coconut-hair-oil-quick-pantry.jpg', '2024-11-20 18:27:54');

-- --------------------------------------------------------

--
-- Table structure for table `dypx_media_data`
--

DROP TABLE IF EXISTS `dypx_media_data`;
CREATE TABLE IF NOT EXISTS `dypx_media_data` (
  `md_id` int NOT NULL AUTO_INCREMENT,
  `md_name` varchar(255) DEFAULT NULL,
  `md_description` text,
  `md_location` varchar(255) DEFAULT NULL,
  `md_image` varchar(255) DEFAULT NULL,
  `md_footfalls` varchar(255) DEFAULT NULL,
  `md_duration` varchar(255) DEFAULT NULL,
  `md_num_slots` varchar(255) DEFAULT NULL,
  `md_num_screens` varchar(255) DEFAULT NULL,
  `md_type` enum('Digital') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Digital',
  `md_location_type` enum('Mall','Theatre','Fuel Station','') DEFAULT NULL,
  `md_size` varchar(255) DEFAULT NULL,
  `md_looptime` varchar(255) DEFAULT NULL,
  `md_status` tinyint(1) DEFAULT '0',
  `md_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`md_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dypx_media_data`
--

INSERT INTO `dypx_media_data` (`md_id`, `md_name`, `md_description`, `md_location`, `md_image`, `md_footfalls`, `md_duration`, `md_num_slots`, `md_num_screens`, `md_type`, `md_location_type`, `md_size`, `md_looptime`, `md_status`, `md_created_date`) VALUES
(1, 'test', NULL, 'Hyderabad', 'uploads/1731941900405_D004225.png', '34', '34', '34', '34', 'Digital', 'Mall', '', '', 0, '2024-11-18 14:58:20'),
(2, 'test', NULL, 'Hyderabad', 'uploads/1731942480737_71kRZ2aZQ5L.jpg', '34', '34', '34', '34', 'Digital', 'Mall', '', '', 0, '2024-11-18 15:08:00'),
(3, 'test', NULL, 'testtt', 'uploads/1731942652720_D004225.png', '34', '34', '34', '34', 'Digital', 'Mall', '', '', 0, '2024-11-18 15:10:52'),
(4, 'test', NULL, 'test', 'uploads/1731952009414_images_(6).jpg', '54', '54', '54', '54', 'Digital', 'Theatre', '', '', 0, '2024-11-18 17:46:49'),
(5, 'test', NULL, 'testset', 'uploads/1731953248807_vatika.jpg', '20', '20', '20', '20', 'Digital', 'Fuel Station', '20', '20', 0, '2024-11-18 18:07:28'),
(6, 'test', 'tet', 'dfgdgf', 'uploads/OIFIRV0.png', '20', '30', '54', '54', '', 'Mall', '', '', 0, '2024-11-19 03:01:08'),
(7, 'test', 'test', 'test', 'uploads/1732114552368_download.jpg', '23', '23', '23', '23', 'Digital', 'Mall', '', '', 0, '2024-11-20 14:55:52'),
(8, 'testset', 'test', 'test', 'uploads/1732122053284_download_(2).jpg', '20', '20', '20', '20', 'Digital', 'Fuel Station', '20', '20', 0, '2024-11-20 17:00:53');

-- --------------------------------------------------------

--
-- Table structure for table `dypx_media_type`
--

DROP TABLE IF EXISTS `dypx_media_type`;
CREATE TABLE IF NOT EXISTS `dypx_media_type` (
  `media_id` int NOT NULL AUTO_INCREMENT,
  `media_name` varchar(255) DEFAULT NULL,
  `media_status` tinyint(1) DEFAULT NULL,
  `media_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`media_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dypx_users`
--

DROP TABLE IF EXISTS `dypx_users`;
CREATE TABLE IF NOT EXISTS `dypx_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dypx_users`
--

INSERT INTO `dypx_users` (`user_id`, `username`, `email`, `password`, `status`, `create_date`) VALUES
(1, 'dypx_admin', 'dynapix@gmail.com', 'dynapix', 0, '2024-11-14 04:20:44');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
