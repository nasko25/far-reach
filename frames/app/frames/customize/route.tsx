/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  const parameters: any = {};
  ctx.url.searchParams.forEach((value: string, key: string, _) => {
    parameters[key] = value;
  });
  return {
    image: (
      <div tw="text-black">
        What would you like to customize about this product?
      </div>
    ),
    // TODO: options should be fetched from the backend
    //  backend should return a list of available options only
    //  and for every available options (size, color, etc.), it should return
    //  a non-empty list of available product customizations to choose from
    // TODO: in case of overflow display parameters depending on ?pages=<page number>
    //  query string parameter
    buttons: 
    ctx.url.searchParams.get("chooseSize") === "true" ? [
        <Button action="post" target={{ pathname: "/customize", query: {...parameters, chooseSize: undefined, size: "S" } }}> S </Button>,
        <Button action="post" target={{ pathname: "/customize", query: {...parameters, chooseSize: undefined, size: "M" } }}> M </Button>,
        <Button action="post" target={{ pathname: "/customize", query: {...parameters, chooseSize: undefined, size: "L" } }}> L </Button>,
    ] : ctx.url.searchParams.get("chooseColor") === "true" ? [
        <Button action="post" target={{ pathname: "/customize", query: {...parameters, chooseColor: undefined, color: "black" } }}> ⚫️ </Button>,
        <Button action="post" target={{ pathname: "/customize", query: {...parameters, chooseColor: undefined, color: "red" } }}> 🔴 </Button>,
    ] : [
      <Button action="post" target={{ pathname: "/customize", query: { ...parameters, chooseSize: "true" } }}> Size </Button>,
      <Button action="post" target={{ pathname: "/customize", query: { ...parameters, chooseColor: "true" } }}> Color </Button>,
      <Button action="post" target={{  query: { ...parameters } }}> Done </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;