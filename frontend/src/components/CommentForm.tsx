import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { CommentFormData, CommentFormProps } from "../types/types";
import validateFile from "../utils/validateFile";
import prepareCommentData from "../utils/prepereCommentData";
import { commentService } from "../services/commentServices";
import ReCAPTCHA from "react-google-recaptcha";
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
  const [captchaToken, setCaptchaToken] = useState<string | null>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (quote) setValue("text", `| ${quote}\n`);
  }, [quote, setValue]);

  const publicKey =
    process.env.REACT_APP_RECAPTCHA_SITE_KEY ||
    "6LciF7krAAAAAAJUitF1eSHF3wgd9vru8yfTHhoM";

  const submitHandler = async (data: CommentFormData) => {
    if (file) {
      const fileErrorMsg = validateFile(file);
      if (fileErrorMsg) return setFileError(fileErrorMsg);
    }
    try {
      const commentData = prepareCommentData(
        data,
        file,
        captchaToken,
        parentId,
        quote
      );
      await commentService.addComment(commentData);
      reset();
      setFile(null);
      setFileError("");
      onSubmit?.({ ...data, attachment: file });
      setCaptchaToken(null);
    } catch {
      alert("Error submitting comment");
      setCaptchaToken(null);
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
      <ReCAPTCHA
        sitekey={publicKey}
        onChange={(token) => setCaptchaToken(token)}
      />
      <button type="submit" className="comment-form_submit">
        Send
      </button>
    </form>
  );
};

export default CommentForm;
