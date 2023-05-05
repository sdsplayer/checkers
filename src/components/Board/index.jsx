import React, { useState } from "react";
import { Main, Rows } from "./style";
import Square from "../Square";
import data from "./data";
import { useEffect } from "react";

const Board = () => {
  //bosilgandagi donani koordinatasi:
  const [selected, setSelected] = useState([]);
  //yurishi mumkin bo'lgan donalar
  let whites = [];
  let blacks = [];
  //damkalar
  let $whites = [];
  let $blacks = [];

  useEffect(() => {
    //effect bo'lganda qaytadan yurishi mumkin bo'lgan donalarni yig'ib olish uchun
    runSelector();
    console.log(blacks);
  }, [data, selected, whites, $whites]);

  function AI() {
    //yuradigan dona random tanlanishi uchun
    let random = Math.floor(Math.random() * blacks.length)
    //o'ngga yoki chapga
    let way = [1, -1]
    let a = Math.floor(Math.random() * 2)
    let b
    if(a===1){
      b=0
    }else{
      b=1
    }
  }

  //dona bosilgandagi funksiya
  function handleClick(row, col) {
    //oldin dona tanlanmaganini aniqlash uchun
    if (selected.length <= 0) {
      //tanlangan dona yuradiganlar listida borligini aniqlash
      if (whites.indexOf(`${row}${col}`) > -1) {
        //dona koordinatasini aniqlab olish uchun
        setSelected([row, col]);
        //belgilangan dona atrofini qizil qilsh
        data[row][col] = 4;
      }
    } else {
      // joy to'g'ri tanlangani va bo'shligini aniqlash
      if (
        row === selected[0] - 1 &&
        (col === selected[1] - 1 || col === selected[1] + 1)
      ) {
        if (data[row][col] === 0) {
          // donani o'tkazish
          data[row][col] = 2;
          //eski donani o'chirish
          data[selected[0]][selected[1]] = 0;
          //selected ni bo'shatish
          setSelected([]);
        }
      } else {
        data[selected[0]][selected[1]] = 2;
      }


      // joy to'g'ri tanlangani bo'shligi va qora donani olsa bo'ladimi aniqlash
      if (
        row + 2 === selected[0] &&
        col + 2 === selected[1] &&
        data[row + 1][col + 1] === 1
      ) {
        if (data[row][col] === 0) {
          //qora donani o'chirish
          data[row + 1][col + 1] = 0;
          // donani o'tkazish
          data[row][col] = 2;
          //eski donani o'chirish
          data[selected[0]][selected[1]] = 0;
          //selected ni bo'shatish
          setSelected([]);
        }
      }
      if (
        row + 2 === selected[0] &&
        col - 2 === selected[1] &&
        data[row + 1][col - 1] === 1
      ) {
        if (data[row][col] === 0) {
          //qora donani o'chirish
          data[row + 1][col - 1] = 0;
          // donani o'tkazish
          data[row][col] = 2;
          //eski donani o'chirish
          data[selected[0]][selected[1]] = 0;
          //selected ni bo'shatish
          setSelected([]);
        }
      }

      //shartlardan o'tolmaganda tozalash uchun
      setSelected([]);
    }
  }

  AI()

  //yurishi mumkin bo'lgan donalarni tanlovchi funksiya
  function runSelector() {
    //tanlangan donalar listini tozalash uchun
    whites = [];
    $whites = [];
    blacks = [];
    $blacks = [];
    //qatorlar (columns) bo'yicha map
    data.map((item, index) => {
      //ustunlar (rows) bo'yicha maq
      item.map((item2, index2) => {
        //donani oqligi va eng tepadagi qatorda emasligini aniqlash
        if (item2 === 2 && index !== 0) {
          //dona yurmoqchi bo'lgan katak bo'shligini aniqlash
          if (
            item2 === 2 &&
            (data[index - 1][index2 - 1] === 0 ||
              data[index - 1][index2 + 1] === 0)
          ) {
            whites.push(`${index}${index2}`);
          }

          //dona ikkinchi qatordan pastda ekanligini aniqlash
          if (index > 1) {
            //dona yurmoqchi bo'lgan katak bo'shligini va dona oladigan donaligini aniqlash
            if (
              item2 === 2 &&
              ((data[index - 2][index2 - 2] === 0 &&
                data[index - 1][index2 - 1] === 1) ||
                (data[index - 2][index2 + 2] === 0 &&
                  data[index - 1][index2 + 1] === 1))
            ) {
              whites.push(`${index}${index2}`);
            }
          }
        } else {
          //dona eng tepadagi qatorda bo'lsa uni damka deb tanlash uchun
          if (item2 === 2) {
            $whites.push(`${index}${index2}`);
          }
        }

        //donani qoraligi va eng pastdagi qatorda emasligini aniqlash
        if (item2 === 1 && index !== 7) {
          //dona yurmoqchi bo'lgan katak bo'shligini aniqlash
          if (
            item2 === 1 &&
            (data[index + 1][index2 - 1] === 0 ||
              data[index + 1][index2 + 1] === 0)
          ) {
            blacks.push(`${index}${index2}`);
          }

          //dona oxiridan ikkinchi qatordan tepada ekanligini aniqlash
          if (index < 6) {
            //dona yurmoqchi bo'lgan katak bo'shligini va dona oladigan donaligini aniqlash
            if (
              item2 === 1 &&
              ((data[index + 2][index2 - 2] === 0 &&
                data[index + 1][index2 - 1] === 2) ||
                (data[index + 2][index2 + 2] === 0 &&
                  data[index + 1][index2 + 1] === 2))
            ) {
              blacks.push(`${index}${index2}`);
            }
          }
        } else {
          if (item2 === 1) {
            //dona eng pastdagi qatorda bo'lsa uni damka deb tanlash uchun
            $blacks.push(`${index}${index2}`);
          }
        }
      });
    });
  }

  let color = false;
  return (
    <Main>
      {data.map((item, index) => {
        if (color) {
          color = false;
        } else {
          color = true;
        }
        return (
          <Rows key={index}>
            {item.map((item2, index2) => {
              if (color) {
                color = false;
              } else {
                color = true;
              }
              return (
                <div onClick={() => handleClick(index, index2)} key={index2}>
                  <Square color={color} code={item2} />
                </div>
              );
            })}
          </Rows>
        );
      })}
    </Main>
  );
};

export default Board;
