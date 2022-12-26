/** @jsxImportSource @emotion/react */
import React from 'react'
import { css, keyframes } from '@emotion/react'
import createIcon from '../images/createIcon.svg';
import styled from '@emotion/styled'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const fadeUp = keyframes`
    0% {
        transform : translateY(30px);
        opacity: 0;
    }
    50% {
        opacity: 0.3;
    }
    70% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
        transform : none;
`;

const fadeLeft = keyframes`
0% {
    transform : translateX(30px);
    opacity: 0;
}
50% {
    opacity: 0.3;
}
70% {
    opacity: 0.5;
}
100% {
    opacity: 1;
    transform : none;
`;

const titleStyle = css`
    font-size : 32px;
    font-family : 'Pretendard-Bold';
    letter-spacing: -0.02em;
    width : 11.4em;
    margin-bottom : 0;
    margin-top : -0.5em;
    animation : ${fadeLeft} 1s ease-in-out;
`

const buttonStyle = css`
    font-family : 'Pretendard-Bold';
    font-size : 20px;
    width : 18.35em;
    height : 3em;
    
    border : none;
    border-radius : 10px;
    background-color: #09CE5B;
    color : white;
    letter-spacing: -0.35px;

    cursor : pointer;
    box-shadow : 7px 7px 13px 0px #B7B8B7;
    animation : ${fadeUp} 1.8s ease-in-out;
    transition : 0.5s ease-in-out;

    &:hover {
        opacity : 70%;
    }
`

const Section = ({ children }) => {
    return (
        <section css={
            css`
                position : absolute;
                top : 50%;
                left : 50%;
                transform : translate(-50%, -50%);
                display : flex;
                flex-direction : column;
                justify-content : center;
                align-items: center;
                row-gap : 2.4em;
                margin-top : -3em;
            `
        }>
            {children}
        </section>
    )
}

const Icon = () => {
    return (
        <img src={createIcon} css={css`
            margin-right : 19.5em;
            animation : ${fadeLeft} 1s ease-in-out;
        `} />
    )
}

const Title = (props) => {
    return (
        <p css={titleStyle} {...props} />
    )
}

const SubTitle = (props) => {
    return (
        <span css={css`
            font-size:14px;
            font-family : 'Pretendard-Bold';
            color : #09CE5B;
            letter-spacing: -0.35px;
            width : 26.21em;
        `}{...props} />
    )
}

const Input = (props) => {
    return (
        <input type="text" css={css`
        font-size: 13px;
        margin-top: 0.8em;
        padding-left: 0;
        font-family : 'Pretendard-Medium';
        border : 0;
        width : 26.21em;
        letter-spacing: -0.35px;

        &:focus {
            outline : none;
        }
        `}{...props} />
    )
}

const Button = (props) => {
    return (
        <button type="submit" css={buttonStyle} {...props} />
    )
}

const InputBox = ({ children }) => {
    return (
        <div css={css`
        display : flex;
        flex-direction : column;
        row-gap : 0.7em;
        animation : ${fadeLeft} 1.4s ease-in-out;
    `}>
            {children}
        </div>
    );
}

export default function Modify() {
    const { DiaryId } = useParams();
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");
    const [day, setDay] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState("");
    const navigate = useNavigate();
    // console.log(DiaryId);

    useEffect(() => {
        axios.get(`/post/getPostOfDay?id=${DiaryId}`)
            .then((res) => {
                // console.log(res);
                setDate(() => {
                    return res.data.date;
                })
                const test = res.data.date.split("-");
                setYear(() => {
                    return test[0];
                });
                setMonth(() => {
                    return test[1];
                })
                setDay(() => {
                    return test[2];
                })

                setTitle(() => {
                    return res.data.title;
                })

                setContent(() => {
                    return res.data.content;
                })

                setEmotion(() => {
                    return res.data.feeling;
                })
            })
    }, []);

    const handleModify = () => {
        axios.put(`/post/update`, JSON.stringify({
            id: DiaryId,
            title: title,
            content: content,
            feeling: emotion,
            date: date,
            state: true,
        }), {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => {
                alert("수정이 완료되었어요!");
                navigate("/");
            })
    }

    return (
        <Section>
            <Icon />
            <Title>
                {`${year}년 ${month}월 ${day}일`} <br />
                오늘의 일기
            </Title>
            <InputBox>
                <SubTitle>일기 제목</SubTitle>
                <Input placeholder="멋진 제목을 입력해주세요!" value={title}></Input>
            </InputBox>
            <InputBox>
                <SubTitle>일기 내용</SubTitle>
                <Input placeholder="멋진 내용을 입력해주세요!" value={content}></Input>
            </InputBox>
            <InputBox>
                <SubTitle>오늘 하루의 기분</SubTitle>
                <Input placeholder="오늘 당신의 기분은 어떠셨나요?" value={emotion}></Input>
            </InputBox>
            <Button onClick={handleModify}>게시글 수정하기</Button>
        </Section>
    )
}