"use client";
import NavBar from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";


function Page() {
  const [snippets, setSnippets] = useState<Array<object>>();
  const [filteredSnippets, setFilteredSnippets] = useState<Array<object>>();
  const [selectedSnippet, setSelectedSnippet] = useState<object>();
  const [filter, setFilter] = useState<object>();

  async function getSnippets() {
    try {
      await axios.get("api/users/mysnippets").then((res) => {
        console.log(res.data.snippets);
        setSnippets(res.data.snippets);
      });
    } catch (error) {}
  }

  useEffect(() => {
    getSnippets();
  }, []);

  function FilterSnippets() {
    try {
      const a: any = [];
      snippets?.forEach((snippet) => {
        if (snippet.title.includes(filter.title)) {
          if (!a.includes(snippet)) a.push(snippet);
        }
        if (snippet.description.includes(filter.description)) {
          if (!a.includes(snippet)) a.push(snippet);
        }
        if (filter.tag != "") {
          snippet.tags.forEach((tag) => {
            if (tag.includes(filter.tag)) {
              if (!a.includes(snippet)) {
                a.push(snippet);
              }
            }
          });
        }

        if (a.length > 0) {
          setFilteredSnippets(a);
        } else {
          setFilteredSnippets(null);
        }
      });
    } catch (error) {}
  }

  useEffect(() => {
    if (
      filter &&
      (filter.tag == "" || filter.tag == undefined || filter.tag == null) &&
      (filter.description == "" ||
        filter.description == undefined ||
        filter.description == null) &&
      (filter.title == "" || filter.title == undefined || filter.title == null)
    ) {
      setFilteredSnippets(null);
    } else {
      FilterSnippets();
    }
  }, [filter]);

  return (
    <div className="text-white">
      <NavBar />

      <div className="flex gap-3 justify-center items-center">
        <Input
          type="text"
          className=""
          placeholder="search by title"
          onChange={(e) => {
            setFilter({ ...filter, title: e.target.value });
          }}
          name=""
          id=""
        />
        {/* <input type="text" onChange={(e)=>{setFilter({...filter,description:e.target.value})}}  name="" id="" /> */}
        <Input
          type="text"
          placeholder="search by tag"
          onChange={(e) => {
            setFilter({ ...filter, tag: e.target.value });
          }}
          name=""
          id=""
        />
      </div>

      <div>
        {(filteredSnippets || snippets) && (
          <>
            {filteredSnippets?.length > 0 ? (
              <div className="flex flex-col justify-center mx-40 gap-7 overflow-y-auto mb-7">
                <p className="text-[#b5daff] text-lg">filtered</p>
                {filteredSnippets &&
                  filteredSnippets.map((snippet) => {
                    if (selectedSnippet == snippet) {
                      return (
                        <div
                          className="bg-[#264F9460] border pl-4 pt-4 flex flex-col gap-2"
                          onClick={() => {
                            setSelectedSnippet(null);
                          }}
                          key={snippet._id}
                        >
                          <p className="text-2xl font-mono">
                            {snippet.title.toUpperCase()}{" "}
                          </p>

                          <p>
                            {" "}
                            <span className="text-[#b5daff]">
                              {" "}
                              Description:{" "}
                            </span>{" "}
                            {snippet.description}{" "}
                          </p>
                          <div className="flex gap-4">
                            <p className="text-[#b5daff]">Tags: </p>
                            <ol>
                              {snippet.tags &&
                                snippet.tags.map((tag) => {
                                  return (
                                    <li
                                      className="inline mr-2 bg-[#f5721690] text-center px-3 py-1 rounded-md border text-white"
                                      key={tag}
                                    >
                                      {tag}
                                    </li>
                                  );
                                })}
                            </ol>
                            <a href={`https://${snippet.src}`} target="_blank" > <GitHubIcon/> </a>
                          </div>
                          <p className="text-[#b5daff]">Code: </p>
                          <div className="bg-[#1e293b] rounded-md text-[#c4cede] max-w-xl border border-slate-300 mb-7 overflow-y-auto">
                            <pre> {snippet.code} </pre>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="bg-[#264F9460] border pl-4 pt-4 flex hover:bg-[#4e78c180] flex-col gap-2"
                          onClick={() => {
                            setSelectedSnippet(snippet);
                          }}
                          key={snippet._id}
                        >
                          <p className="text-xl font-mono">
                            {" "}
                            {snippet.title.toUpperCase()}{" "}
                          </p>
                          <p className="text-[#b5daff]">
                            {" "}
                            {snippet.description}{" "}
                          </p>

                          <ol className="mb-5">
                            {snippet.tags &&
                              snippet.tags.map((tag) => {
                                return (
                                  <li
                                    className="inline mr-2 bg-[#f5721690] text-center px-3 py-1 rounded-md border text-[#ffffff]"
                                    key={tag}
                                  >
                                    {tag}
                                  </li>
                                );
                              })}
                          </ol>
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <div className="flex flex-col justify-center mx-40 gap-7 overflow-y-auto mb-7">
                <p className="text-[#b5daff] text-lg">
                  Showing Non-Filtered Results:{" "}
                </p>

                {snippets &&
                  snippets.map((snippet) => {
                    if (selectedSnippet == snippet) {
                      return (
                        <div
                          className="bg-[#264F9460] border pl-4 pt-4 flex flex-col gap-2"
                          onClick={() => {
                            setSelectedSnippet(null);
                          }}
                          key={snippet._id}
                        >
                          <p className="text-2xl font-mono">
                            {snippet.title.toUpperCase()}{" "}
                          </p>
                          <p>
                            {" "}
                            <span className="text-[#b5daff]">
                              {" "}
                              Description:{" "}
                            </span>{" "}
                            {snippet.description}{" "}
                          </p>
                          <div className="flex gap-4">
                            <p className="text-[#b5daff]">Tags: </p>
                            <ol>
                              {snippet.tags &&
                                snippet.tags.map((tag) => {
                                  return (
                                    <li
                                      className="inline mr-2 bg-[#f5721690] text-center px-3 py-1 rounded-md border text-white"
                                      key={tag}
                                    >
                                      {tag}
                                    </li>
                                  );
                                })}
                            </ol>
                          </div>

                          <p className="text-[#b5daff]">Code: </p>
                          <div className="bg-[#1e293b] rounded-md text-[#c4cede] max-w-xl border border-slate-300 mb-7 overflow-y-auto">
                            <pre> {snippet.code} </pre>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="bg-[#264F9460] border pl-4 pt-4 flex flex-col hover:bg-[#4e78c180] gap-2"
                          onClick={() => {
                            setSelectedSnippet(snippet);
                          }}
                          key={snippet._id}
                        >
                          <p className="text-xl font-mono">
                            {" "}
                            {snippet.title.toUpperCase()}{" "}
                          </p>
                          <p className="text-[#b5daff]">
                            {" "}
                            {snippet.description}{" "}
                          </p>

                          <ol className="mb-5">
                            {snippet.tags &&
                              snippet.tags.map((tag) => {
                                return (
                                  <li
                                    className="inline mr-2 bg-[#f5721690] text-center px-3 py-1 rounded-md border text-[#ffffff]"
                                    key={tag}
                                  >
                                    {tag}
                                  </li>
                                );
                              })}
                          </ol>
                        </div>
                      );
                    }
                  })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Page;