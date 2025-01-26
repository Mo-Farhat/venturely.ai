import React from "react";
import Ping from "./ping";
import { client } from '../sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/writeClient";

const View = async ({ id }: { id: string }) => {
  // Fetch the current views
  const result = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  const totalViews = result ? result.views : 0;

  // Increment the views and update in Sanity
  await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit();

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">
          {totalViews + 1} {totalViews + 1 === 1 ? "View" : "Views"}
        </span>
      </p>
    </div>
  );
};

export default View;
