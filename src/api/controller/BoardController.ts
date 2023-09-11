import { Request, Response } from "express";
import {
  getBoards,
  createBoard,
  getBoard,
  updateBoard,
  destroyBoard,
} from "../model/Board";

export class BoardController {
  async allBoard(_req: Request, res: Response): Promise<void> {
    const boards = await getBoards();
    res.status(200).json({
      message: "board get all is success",
      boards,
    });
  }

  async postBoard(
    req: Request,
    res: Response
  ): Promise<void> {
    const { title, content, userId } = req.body;
    try {
      const board = await createBoard(title, content, userId);

      if (!board) throw new Error("this board does not create");

      res.status(201).json({
        message: "this board create is success",
        board,
      });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async showBoard(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const board = await getBoard(id);

      if (!board) throw new Error("this board does not get");

      res.status(200).json({
        message: "this board get is success",
        board,
      });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async putBoard(
    req: Request,
    res: Response
  ): Promise<void> {
    const { title, content } = req.body;
    try {
      const id = parseInt(req.params.id);

      const board = await updateBoard(id, title, content);
      if (!board) throw new Error("this board does not update");

      res.status(201).json({
        message: "this board update is success",
        board,
      });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async deleteBoard(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const board = await destroyBoard(id);

      if (!board) throw new Error("this board does not delete");

      res.status(201).json({
        message: "this board delete is success",
      });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }
}
