const express = require('express');
const rateLimit = require("express-rate-limit");
import JsonR from '../models/jsonModel.js'

// Configura el límite de solicitudes por minuto (por ejemplo, 100 solicitudes por minuto)
export const apiLimit = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 1, // Límite de solicitudes
    message: "Has excedido el límite de solicitudes. Inténtalo de nuevo más tarde."
  });