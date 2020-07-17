import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";

interface Props {
    cid: string;
    pid: string;
}

const Profile: FunctionalComponent<Props> = (props: Props) => {
    console.log(props);
    const { cid, pid = "" } = props;
    const [html, setHtml] = useState("");

    // gets called when this route is navigated to
    useEffect(() => {
        fetch(`/weekly/find?cid=${cid}&pid=${pid}&type=html`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.content) {
                    setHtml(res.content);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div
            class={style.profile}
            dangerouslySetInnerHTML={{ __html: html }}
        ></div>
    );
};

export default Profile;
