// src/components/CommentForm.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/CommentForm.scss";
import { commentService } from "../services/commentServices";
import { CommentFormData, CommentFormProps } from "../types/types";

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();
  const [fileError, setFileError] = useState<string>("");
  const submitHandler = async (data: CommentFormData) => {
    try {
      await commentService.addComment({ ...data, attachment: file });
      reset();
      setFile(null);
      setFileError("");
      onSubmit?.({ ...data, attachment: file });
      alert("Comment submitted!");
    } catch (err) {
      alert("Error submitting comment");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit(submitHandler)}>
      <div className="field">
        <label>Name *</label>
        <input {...register("userName", { required: "Name is required" })} />
        {errors.userName && (
          <span className="error">{errors.userName.message}</span>
        )}
      </div>

      <div className="field">
        <label>Email *</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="field">
        <label>Comment *</label>
        <textarea
          {...register("text", { required: "Comment is required" })}
          rows={4}
        />
        {errors.text && <span className="error">{errors.text.message}</span>}
      </div>

      <div className="field">
        <label>Attachment</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {file && <span className="file-name">{file.name}</span>}
      </div>

      <button type="submit">Send</button>
    </form>
  );
};

export default CommentForm;
