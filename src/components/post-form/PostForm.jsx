import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTEContorller from "../RTEContorller";
import service from "../../appwrite/database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });
    const [imagePreview, setImagePreview] = useState();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if (file) {
                await service.deleteFile(post?.featuredImage);
            }
            const dbPost = await service.updatePost(post?.$id, { ...data, featuredImage: file ? file.$id : undefined });
            console.log(data, " Featured Image: ", file);
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id, userName: userData.name });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, "-");
        }
    }, []);

    useEffect(() => {
        watch((value, { name }) => {
            if (name == "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        })
    }, [watch, slugTransform, setValue]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-row">
            <div className="w-full lg:w-2/3 px-2 mb-4 lg:mb-0">
                <Input
                    label="Title"
                    placeholder="Title"
                    classname="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    classname="mb-4"
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    {...register("slug", { required: true })}
                />
                <RTEContorller
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-full lg:w-1/3 px-2 relative flex flex-col justify-center">
                <Input
                    label="Featured Image"
                    type="file"
                    classname="mb-4 "
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("image", { required: !post })}
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                setImagePreview(event.target.result);
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}
                />
                {imagePreview && (
                    <div className="w-full mb-4">
                        <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg" />
                    </div>
                )}
                {post && !imagePreview && (
                    <div className="w-full mb-4">
                        <img src={service.getFilepreview(post.featuredImage)} alt={post.title} className="w-full h-auto rounded-lg" />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    classname="mb-4"
                    {...register("status", { required: true })}
                />
                <div className="absolute bottom-0 right-0">
                    <Button
                        type="submit"
                        bgColor={post ? "bg-green-500" : "bg-blue-500"}
                        classname="w-full lg:w-auto lg:ml-auto"
                    >
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
        </form>
    )
}