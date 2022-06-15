import { supabaseClient } from "./supabaseClient";

const defaultCover = (() => {
    // iife for testing purposes; making sure api is being called only once
    console.log("DEFAULT COVER REQUESTED");
    return supabaseClient.storage
        .from("covers")
        .getPublicUrl("public/default.jpg").data?.publicURL;
})();
export default defaultCover;
