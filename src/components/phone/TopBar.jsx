import React, { useState } from "react";
import CreateContactForm from './CreateContactForm'

const TopBar = ({ searchedChat, setSearchedChat, createContForm, setCreateContForm }) => {

  return (
    <>
      <nav className="top-bar">
        <div className="actions-btns">
          <button>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEd0lEQVR4nO1aTYwUVRB+xP9gVFTUoyZcQNndebWLe+Pk/w9q4gHUGwQu4Aa9Ip79OaCwbFVLSDhy1GwMmqD4FxBEvLi7Ahd/IBp2qnpQhKhpU93VM5PszM7P9kz3Er6kk959b6q73quqV/VVO3cNVylGA7kTkJ8Dkrc98qRHngaSMiBfiS+9J57SMZ0DVF63elyWuSJg7f7o5mEMX/HInwDxf0ASdXJ55H+B+FApCF9esSu6qe8KjL778y2A/BoQn6u9GF8GksOAskN3phRUVuqKA0Y36KX3+j8d8yhveJTP7DfJ71F+A+Ltujh9UQIwfMqjnK1T4DggbwQs396prMH9fIcn3gQoJ+rknRnG8ImempEnnqgzje8A5dGs5Jcm5HGP8n2dQnsy352R3X/eF7948pC/gGTriwej6zJ9iHNOZXosv+pJLqW7/XBw8d5MhK8hfkC32wRPDX8w+5DrMUpBecAjzyS+w6f1HRYkcGhfZXkq0BN/C1i52/UJq8dlmUf+KoluclatoitBap81c+JvBg6cX+r6jIED55cC8dHUzLrymZpj85Qedi4njLwf3lU1M+I9HYfY1LH74RNt+QwlAUCjW9uHXd05sdUVBJ54LHX+tkzMI7+enhO9CLHdYu3O6HogOWWBZ2zeyZrvJKmCRBDII65ggCB80nzl3Ly7oslbGiFcERFFS6qRFGVD03me5FOzw42uoACUzbbYHzecoCHW0urLrRLAVQejG63eiDK+vmylSJJR8xVP/E/D97SiSIUdbiVMFdHzJXNFUL5wbcCTfK7zh7H87FxFSN4xYTtcwQHIb9q7vjVn0ErQxloWDJ74eVPkwzmDQPxTfHIGlZWu4Bih2QetVJ6eM+iRZ3Uwz7yqXWgWbtH1jwaDMdMRqSO3EpRn1Koe3MYTuIUqkmfUWjGfIovJtIb2VZY3N62ryNknk+0qr3MFRyngF+YJv8mBqOSZW8wHIliKogxg0aMWkByJ3WCi/Ewz1iJOGpUBLGrUGk3I8jhpXLPrwm1NNOVD8a4Qb3IFBZBsMUefbDrJk7xkK3PCFRFRtMSjnLQdXN/qoPk12RV5zBUMnsKnzY9/admGUGrfJp8sHPmA8kNiMeG2NhnGhOtVQtkVBFBdYJ5puymk/Qkzr0tKjrmcMUI85JH/Nv/trJWh9GS6AkpbujzzKuTT9i7vdSzATOy4ZZlH8yCxV+3+/VaPfMyUONZ1n9HaCtNpW0H/dn3CqLI6xF/bQp5ZcMMnbvTUtnZmaG950PXBJ8CeqVn54F6+PxPBuhqpmWkAUO5Vw6HrCb/L21PHVnMaGL94T7YPSXwmDgB2ncqs+6pUqLYy0M4Jc+ye9t61P1Hb9mp3d3M3XzHECSDJlrq0I4oLvAy7xe20qsfSdMbKTq35j3iSnco7aRWnYVszZb30XptGWhTpnDgVN54gTTsAw225fAFhbYgNSignJUBnabum4laZrs9FgUZQQlkLHa3aAPmj+AMa4gvpRzV2/6OWpzpH5zatJ67BLX78DybKjmn0tz+EAAAAAElFTkSuQmCC" />
          </button>
          <div className="flex">
            <button>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACPElEQVR4nO1WPW8TQRC9AiQKPoVEBR1KIiSTeOfOBU1KAr8D+AtgGrr0CBQyY5NIQENkkSYJiRAFIgLxUfETEBQI52Y2QZQYjW8vgO31GbIOipQnTXOzO+/N7OzcRtE+9goS4gmDvAwkKZC0PJYC8dLEvXQ8KDkgG0D51of4DzMk36EmlXACSF66wPeTO/akb536AGXOCXkRhPz8zNYpQP5hUDYn51uHitbrGl2re3TvX5HFcxtnDEmjHaCztMirg8bRtV3HksVcjOt21E+OvOE51w+AaWlwAWmpvcfTqMrVtcmQNDKlvFyh5ukoMDSmIV5xIha6BWBW9mGQ59DMXTPbLie4EhUFqdxuHjUkNwHlfftqtq8nvzMo1Qv1r0eK9nt5YAABercB5XOfGfApRkmGIiCu21FAYdcn64bk4rm7Xw5r1uVZmQLiV9ltEU7IjgQXACjP8waavNU60OnXb9uNTPIsqADAzbHtWY/pMV/w0oycyKvkq8I/CTA1uZZlxg985L/E8iM3uK6EE4BSzfw8XSiAeNpNvmo4AcRXXVYP/0sF4LceGJ/n47veAwrtbNfhDcDWwagD+g1QnrijWuv071hAQnYkzw6QX8doL+kMUIOavWyQ3+RVKtfkbHABCp1yOu28LyGUj+VZiaM+2JEAhU4/QLlhiN8CyZaay/66+qICeHnMLv4NgUR6KVt0w2al54MhCDk/dT30uPfPhvo+uYOYIW56qxxnJVrQB0N4YrGa+TCPeB97Ez8Bow4hqQ/nxnwAAAAASUVORK5CYII=" />
            </button>
            <button className="pulse">
              <img
                alt="svgImg"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiMzMzlhZjAiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoOC41MzMzMyw4LjUzMzMzKSI+PHBhdGggZD0iTTE1LDNjLTYuNjI3LDAgLTEyLDUuMzczIC0xMiwxMmMwLDYuNjI3IDUuMzczLDEyIDEyLDEyYzYuNjI3LDAgMTIsLTUuMzczIDEyLC0xMmMwLC02LjYyNyAtNS4zNzMsLTEyIC0xMiwtMTJ6TTIxLDE2aC01djVjMCwwLjU1MyAtMC40NDgsMSAtMSwxYy0wLjU1MiwwIC0xLC0wLjQ0NyAtMSwtMXYtNWgtNWMtMC41NTIsMCAtMSwtMC40NDcgLTEsLTFjMCwtMC41NTMgMC40NDgsLTEgMSwtMWg1di01YzAsLTAuNTUzIDAuNDQ4LC0xIDEsLTFjMC41NTIsMCAxLDAuNDQ3IDEsMXY1aDVjMC41NTIsMCAxLDAuNDQ3IDEsMWMwLDAuNTUzIC0wLjQ0OCwxIC0xLDF6Ij48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"
                id="newChatBtn"
                onClick={() => setCreateContForm((p) => !p)}
              />
            </button>
          </div>
        </div>
        <h2 className="title">Chat</h2>
        <div className="search-box">
          <div className="input-group flex">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACAklEQVR4nO2WzUocQRDHhyTuJcZbBF9BfQeTczxoiL6CKCZqXmCvIW/g1Y0GersWYapHlq2awRAQZC5qQENi7jnrQU+G6u3Z3dNmundZBC1oGOiu/vXUx787ih7tvphSqlJHXgZDe4B0AcjX7SHftCtzsmao0AbyWzB8CYbv+g2N9BtiWhwYWK1Wn4Chz53NkU8A0w8qoemdZvO5jPoBz2hDGxr5tHMAw5/ENxgMDqqRbwBppd9mMqcTXrVrHXyQ8N7JRo0knSvrV49br7pwWvCCKqUqnZwirfgeGjBdc76/tvN8rLRj3VZvO6chuVJKPdWGzuweCb0r7agNf3Xg91GgQUybLlVfyoORf4qTVG8oWKrdhfuitBMgXVlwlo2Hgvf3v79w4KuRgmtJMuEN1kMINcTZbFHZ5Z2Qdl0fboSCtWl9dEpW824njXwa2k6A9EP2aCAv+ThWrOALPOFVX7A2tO7+9jLLsmdezhDTYiGZIoOloUivwfCt/VvTmvc9tDUR+u4lka5JCKP+arVeQDXyX2g2J6MQq8qN4+Cu2M5EkUQcpNVk2OpF3ipy2oEW60PhYnLLSFv87yEAhv8Apm8EVmj1wPDtPB8TwRftBUPnVmTaTx85UE2qt7eQhgr3NZV8e9l9mdA5HBxORQ8CDr1hRz4eGbgHnmuko5GCHy1y9g87MzoAHNwGKAAAAABJRU5ErkJggg==" />
            <input
              type="text"
              placeholder="Cerca"
              id="searchInput"
              value={searchedChat}
              onChange={(e) => setSearchedChat(e.target.value)}
            />
            {searchedChat && (
              <img
                id="remove-chats-filter"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPUlEQVR4nO1azWvUUBDPyY+DoqDWm94U8VRPelNEESx6lPo3WIr/hR8HRUE8CXpL39vtZmeylp3ZgIoU8Ww/T36hWDxbW6xMdlttm2zysi/JtnRgYGHfm8wv8/Fm3sRxdmibEsDrgxVoXVNI9zQQaqBphfRTIy8Kt3/TlPwna2RttRoccPqBfN/frf3mTY30UiMva+QVQ15WyA2FPCyynKLpWRDsUdi8rZC/ZFA+jj/rOo2K7EJAVJCuKKB5iwDWM9Ccqrcu5wZATK+QHuYGYBPTc9d9u9cqiFqNBhTS++JAcMgK+J2emDhiBUS1ERwXcxcNQv/jWdGhJxCu/+qwpNESQay0LUPzLgRHe8hMxbuT7uJmmVK0An5StvJ6IwM/Mk6xpSuN0Tzm86X0aRZ4pmyFdaxVaC7VoSkndunKYhKY1kiiNcJSoWxFsTsroE9dA79dAJoJrXjNs9qjQYX8zVgh2ePR4BjwOWNAdboRDwRowligR4Oy1/XplAkYWSt7ZG8VWmfM3Yswtp/IUor/r1BaMFn26M3utfTC9/dHBDldz+6z/F3Xg9OhYg0+oYC+plmrvOBkt7U6ya2xeTXCrfh+VoFp37INS+h1THej4gN7E9rdMjYtodfihL3NQJBnexYc89btW4I7QGg6IkZ4wYrwCDC5gEB5Dv2IssiirQdsdCWr7oTrnvGrcCBJ2cwaELVdXEtZqngLDXakqdzT78aYMDk0dS/pN7zqtGyJLGu0GZA7uZUoSdnJpmUqUSWKXChvpaJRA/2OLBrbKTi8jN4SZbxCgkgQnRQ8bO5WdF4ao6yNVaepumC1sfK3UKvruu6uWCChe9VptGxFdRID3+oKYs0qfXBNquN5NvWNo8wn+tSl/ihoXkwFYg0M8OM+dKkHRiBWXSycT5StPK4yTSYGeBx5XnCoX8YKtRoNOD0Peiy1wdlA8IwCPubYIBl/leNmNCnDJiePYahkjoJAPM119i7ziVxdDWjaOMVmpfah2RqRUsFiLHyUE7uULyAkHUrxFn5fArRkrjwtSRUrMjKnVtskvYHyaUiuMRVwXfrpzoVG56MaXlDIH6Q9lc5OmqLx8Tf7rCuyQ05/0F9x7j0xbHPyJQAAAABJRU5ErkJggg=="
                alt="remove-filter"
                onClick={() => setSearchedChat("")}
              />
            )}
          </div>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEe0lEQVR4nO1aTYwVRRBu4n8wKirqURMuoOzu69rFvXHy/wc18QDqDQIXkKBXxLM/BxQWqkZCwpGjZmM0EYOrBgQRL+6uwsUfiMpO1TwU2agZUzM1+16y89b3O2+W8CWdzG736+nqrqqu+mqcu4orFKOB3A7IzwDJmx553CNPAUkIyLNJ02fiSe3TMUDhutVjssyVAWsPxjcOY/SSR/4YiP8FkriV5pH/AeKPKkH04ord8Q2FCzD69o83AfIrQHyutjC+DCRHAGWnnkwlqK7UHQeMr9Omz/o/7fMor3mUT+036e9RfgHiHbo5hQgBGD3hUc7WCXACkDcChre2OtfgQb7NE28ClJN1850ZxuixnqqRJ95fpxpfA8rD3Zq/sl8e9Sjf1Am0t+unM7Lnj3uShacv+RNItj5/OL6mqy9xzumcHsOXPcml7LQfDC7e3ZXJ1xDfp8dtE08OvzfzgOsxKkE44JGnU9vhH3QNHU04dKC6PJvQE38FWL3TFYTVY7LMI3+eejc5q1rR1kSqnzV14i8HDp1f6grGwKHzS4H4WKZmbdlMzbB5Ui871yeMvBvdMadmxHtbdrGZYRdhE03ZDKUOQL1b05dd3T2x1ZUEnnh7ZvxNqZhHfjW7J3rhYtvF2l3xtUBy2hzP9gUHa7yThgoSQyAPuZIBguhxs5VzC56KBm+Zh3BlRBwvmfOkKBsajkuj2EQPN+b1A8lEqxFuB20idw0om22zP8wVQl2shdWXGwWAhQqC8lneGtKImmc98d+56/TEz9oEn7iSA0iOpq44fCqv8y0TZKcrOQD5dVvrG/M6LQWNhzF82pUcvqY978/rBOLvk+MKqitdyTFCM/dbqjw1r9Mjz2hnP+OqZqFRuHnX33I6E6YjXnU4vt6VHCv04jaeoGNBeuSKJzoWxBNf0E4Nm/smCObfHQ1Vi/j3K9rYx1Mpw3Wu5KgE/NwC7je9EJU8c4v5QoSUt1VdPeIWSYjiKXqyEWuRBI3KALpyk+WzGjSu2X3hltxBSihbBrbJlRRAssUMfbzhIE/yguneyRYmnijq/nBxvMSjnLLfrF+Yy7JU15M8UpggTd8fUcLueJSf/rcModS+DT5VOvIB5dtU8GhbkwxjyvUqoexKApjbYJ5uuiik9QlTr0tKjrk+Y4R4yCP/ZWrYWilD6clsB5qNv3qBoQPV5UrK2VreaXkCU7ETFpwd6weJvWrPrzd75OMmxPG264xWVpjKygr6tysIo8rqEH9hG3mm44JPUuipHe300L5w0BVgE2Dv1Kh8cB/f25WJdTcyNVMHoNyrukPXE36Xd2SGreo0MHbxru6+JLWZxAFYO9216qtSoXrZod0TZtg9rb1rfaJ27HPV3c3tfMWQBIAkW+rCjjhJ8LpYLW6mVK31ip9rYUaS8x/1JLuUd9IsTt22cgDa9FmLRpoU6ZgkFDeeIAs7AKNtffkCwsoQG5RQTlOA1mIsDcUtM13fFwHyoISycrGatQHyB8kHNEpo2Ec19vydpqc6Rsc2zCeuwi1+/Advn43zyMcu6AAAAABJRU5ErkJggg==" />
        </div>
      </nav>
      {createContForm && (
        <CreateContactForm active={createContForm} setActive={setCreateContForm} />
      )}
    </>
  );
};

export default TopBar;
