import Add from "@/public/Add";
import React from "react";

export default async function AddPost() {
  return (
    <div className="h-[100vh] flex flex-col md:justify-center items-center">
      <div className="md:w-[70%] w-[95%] mt-5 md:mt-0 py-2 px-3  flex flex-col justify-center items-center bg-blockground/90 rounded-xl">
        <h2 className="mb-2 w-full flex font-semibold">
          <Add /> Новый пост:
        </h2>
        <textarea className="w-full h-[100px] rounded-xl text-black p-2"></textarea>
        <div className="w-full flex justify-end mt-2">
          <button className="py-2 px-5 my-2 rounded-xl  hover:bg-blockground/70 bg-indigo-500">
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
