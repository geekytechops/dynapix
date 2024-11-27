-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 27, 2024 at 01:23 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
