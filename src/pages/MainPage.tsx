import { useEffect, useState } from "react";
import styled from "styled-components";

interface resultType {
  result: string;
}

export const MainPage = () => {
  const [storeValue, setStoreValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const electron = window.require("electron");

  const nowStoreFunc = () => {
    electron.ipcRenderer.send("nowStore");
  };
  const textFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const changeStoreFunc = () => {
    electron.ipcRenderer.send("changeStore", inputValue);
  };

  const handleStoreResponseFunc = (event: any, { result }: resultType) => {
    setStoreValue(result);
  };
  electron.ipcRenderer.on("NOWSTORE_RESULT", handleStoreResponseFunc);

  useEffect(() => {
    nowStoreFunc();
    electron.ipcRenderer.on("NOWSTORE_RESULT", handleStoreResponseFunc);
  }, []);

  return (
    <div>
      메인페이지입니다
      <RowDiv>
        <CurrentStoreValue>{storeValue}</CurrentStoreValue>
        <ChangeStoreBtn onClick={nowStoreFunc}>store 확인</ChangeStoreBtn>
      </RowDiv>
      <RowDiv>
        <ChangeInput value={inputValue} onChange={textFunc} />
        <ChangeStoreBtn onClick={changeStoreFunc}>store 변경</ChangeStoreBtn>
      </RowDiv>
    </div>
  );
};

const RowDiv = styled.div`
  width: 220px;
  display: flex;
  column-gap: 20px;
  margin-top: 20px;
`;

const CurrentStoreValue = styled.div`
  width: 85px;
  border-bottom: 1px solid gray;
`;

const ChangeStoreBtn = styled.div`
  width: 80px;
  height: 25px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: orange;
  &:hover {
    cursor: pointer;
  }
`;

const ChangeInput = styled.input`
  width: 80px;
`;
