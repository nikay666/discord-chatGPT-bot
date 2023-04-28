
import { OpenAIApi } from "openai";
import { config } from "./config.ts";


const openai = new OpenAIApi(config);

export const getChatGPTResponce = async (text: string) => {
  try {
    const res =  await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0,
      max_tokens: 20,
    });

    console.log('DATA: ', res.data)

    if(res.status === 429) {
      return {
        data: 'Too Many Requests',
        status: res.status,
      }
    }

    const resultText = res.data.choices.map(el => el.text).join('');
    
    return {
      data: resultText,
      status: res.status,
    }
  } catch (error) {
    console.log('[getChatGPTResponce ERROR]: ',  error);

    return {
      data: 'ERROR in getChatGPTResponce',
      status: 0,
    }
  }

}


// console.log('response: ', await getChatGPTResponce());