import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  // Weatherdata in the body of the POST request
  const { weatherData } = await request.json();

  console.log("WEATHER DATA IS: ", weatherData);

  const response = await openai.createChatCompletion({
    model: "gpt-3",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Take all the weather data into consideration and make a one liner joke on todays weather `,
      },
      {
        role: "user",
        content: `Hi there, can I get a summary of todays weather, use the following information to get the weather 
        data:${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;

  console.log("DATA IS: ", data);

  return NextResponse.json(data.choices[0].message);
}