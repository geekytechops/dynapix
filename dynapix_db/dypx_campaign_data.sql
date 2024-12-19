-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 19, 2024 at 03:13 PM
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
-- Table structure for table `dypx_campaign_data`
--

DROP TABLE IF EXISTS `dypx_campaign_data`;
CREATE TABLE IF NOT EXISTS `dypx_campaign_data` (
  `campaign_id` int NOT NULL AUTO_INCREMENT,
  `campaign_type` varchar(255) DEFAULT NULL,
  `campaign_main_image` varchar(255) DEFAULT NULL,
  `campaign_title` varchar(255) DEFAULT NULL,
  `campaign_desc` text,
  `campaign_images` text,
  `campaign_status` tinyint NOT NULL DEFAULT '0',
  `campaign_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`campaign_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
