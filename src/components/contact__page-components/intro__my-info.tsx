import "./intro__my-info.css";
import Sandwich from "../../assets/sandwich-2.jpg";
import React from "react";

export default function My__info(): React.JSX.Element {

  return (
    <div className="contact__intro__info">
      <div className="contact__intro__info__card">
        <img
          src={Sandwich}
          alt="sandwich image"
          className="contact__intro__info__card__image"
        />
        <div className="contact__intro__info__card__text">
          <h2 className="contact__intro__info__card__text__h2">WoRZX</h2>
          <h4 className="contact__intro__info__card__text__h4">
            Project made by{" "}
            <a href="https://parallax-stencuk.pages.dev/">Alexandr Stenčuk</a>
          </h4>
          <p className="contact__intro__info__card__text__p">
            This project was made with React, TypeScript, Material UI, Bulma
            css. The project was made for building some shop project although it
            looks more like restaurant in the end. Although it took so much time
            to make it I am happy with the result. I hope you like it too.
          </p>
        </div>
      </div>
    </div>
  );
}
