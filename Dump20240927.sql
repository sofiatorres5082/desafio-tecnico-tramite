CREATE DATABASE  IF NOT EXISTS `municipalidad` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `municipalidad`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: municipalidad
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tramites`
--

DROP TABLE IF EXISTS `tramites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tramites` (
  `id_tramite` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `cuit` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `dominio` varchar(255) NOT NULL,
  `anio` int NOT NULL,
  `archivoBaja` varchar(255) NOT NULL,
  `estado` enum('Pendiente','Aprobado','Rechazado','En Proceso') DEFAULT 'Pendiente',
  `comentario` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_tramite`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `dni_2` (`dni`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `dni_3` (`dni`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `dni_4` (`dni`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `dni_5` (`dni`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `dni_6` (`dni`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `dni_7` (`dni`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `dni_8` (`dni`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `dni_9` (`dni`),
  UNIQUE KEY `email_9` (`email`),
  KEY `userId` (`userId`),
  CONSTRAINT `tramites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tramites`
--

LOCK TABLES `tramites` WRITE;
/*!40000 ALTER TABLE `tramites` DISABLE KEYS */;
INSERT INTO `tramites` VALUES (1,2,'Juan','Pérez','12345678','20345678901','juan.perez@example.com','123456789','ABC123',2022,'archivo.pdf','Pendiente','Comentario de prueba','2024-09-27 06:37:28','2024-09-27 06:37:28'),(2,4,'Mario','Jiance','45987972','23467899879','mario.gonzales@example.com','03364006347','ABC1234',2023,'ftp://192.168.0.110/archivosBaja/Manejo de excepciones.pdf','En Proceso','Su trámite está en proceso.','2024-09-27 07:04:31','2024-09-27 07:05:25'),(4,5,'Alana','Lopez','78787878','27987876342','alana.lopez@example.com','3364216861','ABC1234',2023,'ftp://192.168.0.110/archivosBaja/read_me.pdf','Aprobado','Su trámite ha sido aprobado.','2024-09-27 15:07:06','2024-09-27 15:08:38'),(6,7,'Juan','Gomez','33334234','27459879728','juan.gomez@example.com','03364006347','ABC1234',2022,'ftp://192.168.0.110/archivosBaja/Manejo de excepciones.pdf','Rechazado','Su trámite ha sido rechazado.','2024-09-27 15:21:11','2024-09-27 15:22:33');
/*!40000 ALTER TABLE `tramites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','User','admin@example.com','$2a$10$yLBvyhE6FqUzER5KvUx66.T1AyUwcC/lKDCXBh6ZzEvMePzos5zNi',1),(2,'Juan','Pérez','juan.perez@example.com','$2a$10$W4fVuVRS2UeE9gljxPB79evjDOTauKaf.243/P6sZ5qYJNnhL2R7W',0),(3,'María ','García','maria.garcia@example.com','$2a$10$FDW763cisCzPQQwY.E9VgetgwUbka7OtHVsskw.D01XiyX1ZvUbh2',0),(4,'Mario','Gonzales','mario.gonzales@example.com','$2a$10$2Ol91EyM1Co4qDqw93KDYuuTfvQyX7mzc72gIXjOudiyMWu1KeVeC',0),(5,'Alana','Lopez','alana.lopez@example.com','$2a$10$Awsf0Qod.43lf6p0GyyfV.oAak6c4h.Mp8yspr0X/HCrHtha2j48q',0),(6,'Ulises','Gomez','ulises.gomez@example.com','$2a$10$aAMsqQ7iW51ADLFDBvETre8uDTfOZLx40Tu/QArTB.z3.ivX/hALi',0),(7,'Juan','Gomez','juan.gomez@example.com','$2a$10$Qu9w4/iMYYV71bRsgKWsEe2EBoIUZNjQekYE8b/QLmP4r0PVXaj/y',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-27 14:16:39
