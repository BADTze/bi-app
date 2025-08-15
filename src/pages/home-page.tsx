import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex p-2">
      <div className="flex w-full flex-wrap">
        <div className="w-full mb-3 border-1 h-15 content-center rounded-2xl p-2">
          <h2 className="uppercase font-bold">Apps Title</h2>
          
        </div>

        <div className="w-96 p-1">
          <Card>
            <CardHeader>
              <CardTitle>Title dari konten</CardTitle>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
              nesciunt iure iusto vero aperiam? Quidem error veniam magnam, rem
              sit eum quaerat voluptatum praesentium corrupti! Reiciendis
              recusandae dolor iste mollitia.
            </CardContent>
          </Card>
        </div>
        <div className="w-96 p-1">
          <Card>
            <CardContent>KONTEN 2</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
