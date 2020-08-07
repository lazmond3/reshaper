import React, { useState, useEffect } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react'
// import logo from './logo.svg';
// import './App.css';

const ButtonExampleButton = (props:{ text: string,  listener?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) =>
 (<div style={{ display: "inline", marginLeft: "5px" }}>
  <Button onClick={props.listener} >{props.text}</Button>
  </div>
)
const ButtonATag = (props: {url: string, text:string}) => (
  <div style={{display: "inline", marginLeft: "5px"}}>
    <Button as="a" href={props.url}>
    {/* <Button as="a" href={"https://translate.google.co.jp/#view=home&op=translate&sl=en&tl=ja&text=" + encodeURI(query)}> */}
      {props.text}
    </Button>

  </div>
)

const convertNewLineToSpace = (text: string): string => {
  const newSpaced = text.replace(/\n/g, " ")
    .replace(/ +/g, " ")
    .replace(/\./g, ".\n")
    .replace(/^ +/g, "")
  return newSpaced
}

function App() {
  const [rawText, setRawText] = useState("")
  // const [convertedText, setConvertedText] = useState("")

  useEffect(() => {

  }, [rawText])
  const setTextHandler = (e: any) => setRawText(e.target.value)

  return (
    <div style={{
      width: "800px",
      margin: "auto",
      marginTop: "50px"
    }}>
      <h1>Reshaper (Remove Space)</h1>
      <Form>
        <TextArea onChange={setTextHandler} value={rawText} placeholder='pdfの文字' style={{ minHeight: 100 }} />
      </Form>

      <div style={{
        marginTop: "20px",
        marginBottom: "20px"
      }}>
        <ButtonExampleButton listener={e => {
          (document.getElementById("clipinput") as any).select()
          document.execCommand("copy");
        }} text={"結果をコピーする"} />
        <ButtonATag url={`https://translate.google.co.jp/#view=home&op=translate&sl=en&tl=ja&text=${encodeURI(convertNewLineToSpace(rawText))}`} text={"Google翻訳"} />
        <ButtonATag url={`https://www.deepl.com/ja/translator#en/ja/${encodeURI(convertNewLineToSpace(rawText))}`} text={"DeepL翻訳"} />
      </div>

      <Form readonly>
        <TextArea id={"clipinput"} value={convertNewLineToSpace(rawText)} placeholder='変換後の文字列' style={{ minHeight: 100 }} />
      </Form>
      <div>
        <h2>todoリスト</h2>
        <ul>
          <li>編集禁止にする -> できなかった</li>
          <li>✅コピーボタンを作る</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
