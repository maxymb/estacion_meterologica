-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2020 a las 04:47:12
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
-- Base de datos: `db_estacion_meterologica`
--
CREATE DATABASE db_estacion_meterologica;
USE db_estacion_meterologica;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id_config` int(11) NOT NULL,
  `horario_encendido_luminaria` varchar(25) NOT NULL,
  `horario_apagado_luminaria` varchar(25) NOT NULL,
  `PIN_alarma_meterologica` int(11) NOT NULL,
  `PIN_luminaria` int(11) NOT NULL,
  `PIN_sensor_antirrobo` int(11) NOT NULL,
  `email_notificacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id_config`, `horario_encendido_luminaria`, `horario_apagado_luminaria`, `PIN_alarma_meterologica`, `PIN_luminaria`, `PIN_sensor_antirrobo`, `email_notificacion`) VALUES
(1, '22:00', '14:00', 4, 7, 8, 'maxybarrionuebo@gmail.com');

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
(5, '2020-06-22 13:51:22', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:43', 'Evento Critico'),
(6, '2020-06-22 13:53:03', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(7, '2020-06-22 13:53:46', 'El sensor Humedad, de modelo: unalinda ha alcanzado valores criticos. Lectura de de:40', 'Evento Critico'),
(8, '2020-06-22 15:08:44', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(9, '2020-06-22 15:15:09', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:43', 'Evento Critico'),
(10, '2020-06-22 15:15:56', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:43', 'Evento Critico'),
(11, '2020-06-22 15:16:04', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:43', 'Evento Critico'),
(12, '2020-06-22 15:16:24', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:43', 'Evento Critico'),
(13, '2020-06-22 15:16:36', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(14, '2020-06-22 15:16:40', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:43', 'Evento Critico'),
(15, '2020-06-24 18:41:16', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:40', 'Evento Critico'),
(16, '2020-06-26 14:46:36', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:40', 'Evento Critico'),
(17, '2020-06-26 16:48:56', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:40', 'Evento Critico'),
(18, '2020-06-30 17:31:36', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(19, '2020-06-30 17:31:53', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(20, '2020-06-30 17:32:41', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(21, '2020-06-30 17:34:00', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(22, '2020-06-30 17:34:41', 'El sensor Temperatura, de modelo: PamelaDavid ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(23, '2020-06-30 17:35:30', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(24, '2020-07-01 18:43:39', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(25, '2020-07-01 18:51:38', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(26, '2020-07-01 20:38:04', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(27, '2020-07-01 20:40:01', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(28, '2020-07-01 20:41:54', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(29, '2020-07-01 20:57:20', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:96', 'Evento Critico'),
(30, '2020-07-04 21:55:53', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:93.44815924860201', 'Evento Critico'),
(31, '2020-07-04 22:18:26', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:81.58267300296174', 'Evento Critico'),
(32, '2020-07-04 22:21:40', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:92.37095660188362', 'Evento Critico'),
(33, '2020-07-04 22:23:22', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:89.84549678975743', 'Evento Critico'),
(34, '2020-07-04 22:25:51', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:87.10036844238442', 'Evento Critico'),
(35, '2020-07-04 22:28:37', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:88.50040788707373', 'Evento Critico'),
(36, '2020-07-04 22:31:28', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:87.11399057848166', 'Evento Critico'),
(37, '2020-07-04 22:33:03', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:99.97765095324273', 'Evento Critico'),
(38, '2020-07-04 22:40:08', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:91.51164744468639', 'Evento Critico'),
(39, '2020-07-04 22:40:54', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:80.49468488739268', 'Evento Critico'),
(40, '2020-07-04 22:52:48', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:99.40070602427156', 'Evento Critico'),
(41, '2020-07-04 22:53:21', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:87.73419122097685', 'Evento Critico'),
(42, '2020-07-04 22:54:53', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:97.67180992731016', 'Evento Critico'),
(43, '2020-07-04 22:59:42', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:93.07882015980826', 'Evento Critico'),
(44, '2020-07-04 23:00:16', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:62.881787967839564', 'Evento Critico'),
(45, '2020-07-04 23:03:15', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:97.9209654884854', 'Evento Critico'),
(46, '2020-07-04 23:04:36', 'El sensor Viento, de modelo: Melina ha alcanzado valores criticos. Lectura de de:71.00920562460583', 'Evento Critico');

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
  `critico_min` float DEFAULT NULL,
  `PIN` int(11) DEFAULT NULL,
  `frecuencia_muestreo` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`id_sensor`, `nombre`, `modelo`, `valor_transferencia_A`, `valor_transferencia_B`, `valor_transferencia_C`, `critico_max`, `critico_min`, `PIN`, `frecuencia_muestreo`) VALUES
(1, 'Temperatura', 'PamelaDavid', 0, 1, 0, 60, 60, 2, 4),
(2, 'Viento', 'Melina', 0, 1, 0, 100, 65, 3, 0.5),
(3, 'Humedad', 'unalinda', 0, 1, 0, 100, 100, 5, 0.4);

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
