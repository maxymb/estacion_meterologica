-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-07-2020 a las 18:18:36
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_estacion_meteorologica`
--

-- --------------------------------------------------------
CREATE DATABASE db_estacion_meteorologica;
USE db_estacion_meteorologica;
--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id_config` int(11) NOT NULL,
  `horario_encendido_luminaria` varchar(25) NOT NULL,
  `horario_apagado_luminaria` varchar(25) NOT NULL,
  `email_notificacion` varchar(50) NOT NULL,
  `frecuencia_muestreo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id_config`, `horario_encendido_luminaria`, `horario_apagado_luminaria`, `email_notificacion`, `frecuencia_muestreo`) VALUES
(1, '21:23', '16:00', 'maxybarrionuebo@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `id_evento` int(11) NOT NULL,
  `fecha_y_hora` datetime NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `tipo_evento` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id_evento`, `fecha_y_hora`, `descripcion`, `tipo_evento`) VALUES
(170, '2020-07-15 18:47:03', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:66.06756732859509', 'Evento Critico'),
(171, '2020-07-15 18:47:09', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:86.20315457834144', 'Evento Critico'),
(172, '2020-07-15 18:47:13', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:87.94370671131051', 'Evento Critico'),
(173, '2020-07-15 18:47:14', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:85.12624519252316', 'Evento Critico'),
(174, '2020-07-15 18:47:20', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:65.60437317542898', 'Evento Critico'),
(175, '2020-07-15 18:47:22', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:86.17902870487708', 'Evento Critico'),
(176, '2020-07-15 18:47:23', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:97.65097447213171', 'Evento Critico'),
(177, '2020-07-15 18:47:24', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:87.75506357567386', 'Evento Critico'),
(178, '2020-07-15 18:47:28', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:88.08550470217978', 'Evento Critico'),
(179, '2020-07-15 18:47:29', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:95.53279034383422', 'Evento Critico'),
(180, '2020-07-15 18:47:31', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:72.95234785351519', 'Evento Critico'),
(181, '2020-07-15 18:47:32', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:79.56917053057408', 'Evento Critico'),
(182, '2020-07-15 18:47:33', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:74.76194314698135', 'Evento Critico'),
(183, '2020-07-15 18:47:34', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:86.38656318231932', 'Evento Critico'),
(184, '2020-07-15 18:47:44', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:81.53466017917633', 'Evento Critico'),
(185, '2020-07-15 18:47:52', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:72.82678396941786', 'Evento Critico'),
(186, '2020-07-15 18:47:55', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:79.91431019946747', 'Evento Critico'),
(187, '2020-07-15 18:47:56', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:76.02053420014794', 'Evento Critico'),
(188, '2020-07-15 18:47:57', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:72.87463003210742', 'Evento Critico'),
(189, '2020-07-15 18:48:00', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:92.12326932708106', 'Evento Critico'),
(190, '2020-07-15 18:48:01', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:93.79153799470139', 'Evento Critico'),
(191, '2020-07-15 18:48:11', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:73.85479062162787', 'Evento Critico'),
(192, '2020-07-15 18:48:16', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:91.35376758748225', 'Evento Critico'),
(193, '2020-07-15 18:48:17', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:81.17443146978731', 'Evento Critico'),
(194, '2020-07-15 18:48:18', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:80.12019916237321', 'Evento Critico'),
(195, '2020-07-15 18:48:19', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:86.40221219813884', 'Evento Critico'),
(196, '2020-07-15 18:48:23', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:71.9957798384022', 'Evento Critico'),
(197, '2020-07-15 18:48:30', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:96.60371282763074', 'Evento Critico'),
(198, '2020-07-15 18:48:37', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:70.62418962991875', 'Evento Critico'),
(199, '2020-07-15 18:48:38', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:65.89298450069433', 'Evento Critico'),
(200, '2020-07-15 18:48:39', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:96.91400537585122', 'Evento Critico'),
(201, '2020-07-15 19:13:59', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:92.47796663411296', 'Evento Critico'),
(202, '2020-07-15 19:14:03', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:75.4528471444019', 'Evento Critico'),
(203, '2020-07-15 19:14:05', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:98.56002673905022', 'Evento Critico'),
(204, '2020-07-15 19:14:07', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:68.8215935698722', 'Evento Critico'),
(205, '2020-07-15 19:14:15', 'El sensor Viento, de modelo: 107U ha alcanzado valores criticos. Lectura de de:85.22494829030151', 'Evento Critico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `id_sensor` int(11) NOT NULL,
  `nombre` varchar(25) DEFAULT NULL,
  `modelo` varchar(25) DEFAULT NULL,
  `valor_transferencia_A` int(11) DEFAULT NULL,
  `valor_transferencia_B` int(11) DEFAULT NULL,
  `valor_transferencia_C` int(11) DEFAULT NULL,
  `critico_max` float DEFAULT NULL,
  `critico_min` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`id_sensor`, `nombre`, `modelo`, `valor_transferencia_A`, `valor_transferencia_B`, `valor_transferencia_C`, `critico_max`, `critico_min`) VALUES
(1, 'Temperatura', 'MCP9700', 0, 1, 0, 60, 60),
(2, 'Viento', '107U', 0, 1, 0, 100, 65),
(3, 'Humedad', 'HIH4000', 0, 1, 0, 100, 100);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id_config`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id_evento`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`id_sensor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
