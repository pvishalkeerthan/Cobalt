"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function SnippetComponent({ code, getHubLink }) {
  const router = useRouter();

  useEffect(() => {
    if (code) {
      setSnippetData({ ...snippetData, code: code, src: getHubLink });
    }
  }, []);

  let [snippetData, setSnippetData] = useState({
    title: "",
    description: "",
    code: "",
    tags: [],
    src: getHubLink,
  });

  // useEffect(()=>{
  //   console.log(getHubLink)
  //   if(getHubLink){
  //     setSnippetData({...snippetData, src: getHubLink})
  //   }
  // },[getHubLink])
  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = (e) => {
    e.preventDefault();

    if (tagInput.trim() !== "") {
      setSnippetData((prevData: any) => ({
        ...prevData,
        tags: [...prevData.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  let handleInputChange = (event) => {
    let fieldName = event.target.name;
    let newValue = event.target.value;
    setSnippetData((currData) => {
      return { ...currData, [fieldName]: newValue };
    });
  };

  useEffect(() => {
    console.log(snippetData.tags);
  }, [snippetData.tags]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("api/users/addsnippet", snippetData).then((res) => {
        if (res.data.success == false) {
          toast.error("Please Login");
          router.push("/login");
          return;
        }
        setSnippetData({
          title: "",
          description: "",
          code: "",
          tags: [],
        });
        toast.success("Successfully Saved!");
      });

      console.log("Sending data to MongoDB:", snippetData);
    } catch (error) {
      console.error("Error storing data in MongoDB:", error);
    }
  };

  return (
    <div className=" flex flex-col text-white pl-7">
      <h1 className="text-xl mt-10 font-mono text-center">Save Code Snippet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="mr-4 text-[#b5daff]">
            Title:{" "}
          </label>
          <Input
            placeholder="Enter name"
            className="text-[#c4cede]"
            type="text"
            value={snippetData.title}
            onChange={handleInputChange}
            id="title"
            name="title"
          ></Input>
        </div>
        <div className="py-2 flex">
          <label htmlFor="code" className="my-3 text-[#b5daff] mr-4">
            Add the code snippet:{" "}
          </label>
          <textarea
            placeholder="Your code"
            className="px-4 pt-5 min-h-[150px] mt-2 min-w-[400px] bg-[#1e293b] rounded-md text-[#c4cede] focus:outline-none focus:ring focus:ring-opacity-60"
            value={snippetData.code}
            onChange={handleInputChange}
            id="code"
            name="code"
          ></textarea>
        </div>
        <div className="flex gap-4">
          <label htmlFor="description" className="text-[#b5daff]">Description: </label>
          <textarea
            placeholder="What is the snippet about"
            className="px-4 py-1 min-h-[100px] min-w-[300px] bg-[#1e293b] rounded-md text-[#c4cede] focus:outline-none focus:ring focus:ring-opacity-60"
            value={snippetData.description}
            onChange={handleInputChange}
            id="description"
            name="description"
          ></textarea>
        </div>
        <div>
          <div className="mt-0">
            <Input
              type="text"
              className="w-[200px]"
              value={tagInput}
              onChange={handleTagInputChange}
              placeholder="Enter a tag"
            />
            <Button variant="snipbutton" className="w-20 ml-4" onClick={addTag}>
              Add Tag
            </Button>
          </div>
          <div>
            {snippetData.tags != [] ? (
              <ul className="mt-5 ml-2 mb-5">
                {}
                {snippetData.tags.map((item, index) => (
                  <li
                    className="inline mr-2 bg-[#40506a] text-center px-3 py-1 rounded-md border text-[#b5daff]"
                    key={index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>empty</p>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              variant="anibutton"
              className="w-30 my-4 ml-10"
              type="submit"
            >
              <span className="z-50">Add Snippet</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
{
  /* <ul>
        {}
        {snippetData.tags.map((item, index) => (
         
          <li key={index}>{item}</li>
        ))}
      </ul> */
}
