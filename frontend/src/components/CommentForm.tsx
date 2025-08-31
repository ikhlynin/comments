import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { CommentFormData, CommentFormProps } from "../types/types";
import validateFile from "../utils/validateFile";
import prepareCommentData from "../utils/prepereCommentData";
import { commentService } from "../services/commentServices";
import Captcha from "./Captcha";
import "../styles/CommentForm.scss";

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  parentId,
  quote,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CommentFormData>();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    if (quote) setValue("text", `| ${quote}\n`);
  }, [quote, setValue]);

  const submitHandler = async (data: CommentFormData) => {
    if (!captchaText || !sessionId) {
      return alert("Please complete the CAPTCHA");
    }

    if (file) {
      const fileErrorMsg = validateFile(file);
      if (fileErrorMsg) return setFileError(fileErrorMsg);
    }
    try {
      const commentData = prepareCommentData(
        data,
        file,
        parentId,
        quote,
        captchaText,
        sessionId
      );
      await commentService.addComment(commentData);
      // reset();
      setFile(null);
      setFileError("");
      onSubmit?.({ ...data, attachment: file });
    } catch {
      alert("Error submitting comment");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="comment-form">
      <input placeholder="Name" {...register("userName", { required: true })} />
      <input placeholder="Email" {...register("email", { required: true })} />
      <input placeholder="Home Page" {...register("homePage")} />
      <textarea
        placeholder="Comment"
        {...register("text", { required: true })}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      {fileError && <span className="comment-form_error">{fileError}</span>}
      <Captcha
        onChange={(text, id) => {
          setCaptchaText(text);
          setSessionId(id);
        }}
      />

      <button type="submit" className="comment-form_submit">
        Send
      </button>
    </form>
  );
};

export default CommentForm;
