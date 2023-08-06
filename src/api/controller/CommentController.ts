import { Request, Response } from "express";
import {
  createComment,
  updateComment,
  destroyComment
} from "../model/Comment";

export class CommentController {
  async postComment(
    req: Request,
    res: Response
  ): Promise<void> {
    const { content, userId } = req.body;

    try {
      const boardId = parseInt(req.params.id);
      const comment = await createComment(content, userId, boardId);

      if (!comment) throw new Error("this comment does not create");

      res.status(201).json({
        message: "this comment create is success",
        comment,
      });

    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async putComment(
    req: Request,
    res: Response
  ): Promise<void> {
    const { content, userId } = req.body;

    try {
      const boardId = parseInt(req.params.boardId);
      const commentId = parseInt(req.params.commentId);
      const comment = await updateComment(commentId, content, userId, boardId);

      if (!comment) throw new Error("this comment does not update");

      res.status(201).json({
        message: "this comment update is success",
        comment,
      });

    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async deleteComment(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const commentId = parseInt(req.params.commentId);
      const comment = await destroyComment(commentId);

      if (!comment) throw new Error("this comment does not delete");

      res.status(201).json({
          message: "this comment delete is success",
      });
      
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }
}
