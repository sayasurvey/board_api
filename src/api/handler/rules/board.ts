import { check } from "express-validator";

export const boardCreateRule = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("title is required")
    .isLength({ max: 255 })
    .withMessage("title mast be at largest 255 characters"),
  check("content")
    .isLength({ max: 255 })
    .withMessage("content mast be at largest 255 characters")
];

export const boardUpdateRule = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("title is required")
    .isLength({ max: 255 })
    .withMessage("title mast be at largest 255 characters"),
  check("content")
    .isLength({ max: 255 })
    .withMessage("content mast be at largest 255 characters")
];
