import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import "../App.css"

export default function Docs() {
    const { url, path } = useRouteMatch();
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Docs</h2>

            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
                <Link to={`${url}/import`}>Import</Link> |{" "}
                <Link to={`${url}/view`}>View</Link> |{" "}
                <Link to={`${url}/search`}>Search</Link> |{" "}
                <Link to={`${url}/collection`}>Collection</Link>
            </nav>
            <Switch>
                <Route path={`${path}/import`}>
                    <Import />
                </Route>
                <Route path={`${path}/view`}>
                    <View />
                </Route>
                <Route path={`${path}/search`}>
                    <Search />
                </Route>
                <Route path={`${path}/collection`}>
                    <Collection />
                </Route>
            </Switch>
        </main >
    )
}



export function Import() {

    const [postcondition, setPostcondition] = useState({});
    // Generate JSX code for error message
    function renderPostcondition() {
        return postcondition.success
            ?
            postcondition.show && <div className="import_success_div">Upload successful.</div>
            :
            postcondition.show && <div className="import_error_div">Upload failed.</div>
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO
        // if success do:
        setPostcondition({ show: true, success: true });
    };
    return (
        <div style={{ marginTop: "50px", width: "20%" }}>
            <h3>Import</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label for="file-identifier">Provide file ID:</label>
                    <input id="file-identifier" type="text" required />
                </div>
                <div className="input-container">
                    <label for="browse">Choose file to upload: </label>
                    <input id="browse" type="file" name="file" accept=".pdf, application/pdf" multiple required />
                </div>
                <div className="input-container">
                    <input id="file-submit" type="submit" value="Submit" />
                </div>
                {renderPostcondition()}
            </form>
        </div>
    );
}


export function View() {
    // TODO
    return (
        <div style={{ marginTop: "50px" }}>
            <h3>View</h3>
            <div id="hash">
                <div id="view-document">
                    TODO: embed vs iframe vs object
                </div>
                <div>
                    <button id="download-document">Download</button>
                </div>
                <div id="comments">
                    TODO: A list of comments, like:
                    <div id="comment_1">
                        Comment 1
                    </div>
                    <div id="comment_2">
                        Comment 2
                    </div>
                </div>
            </div>
        </div>
    );
}


export function Search() {
    // TODO: advanced search
    return (
        <div style={{ marginTop: "50px", width: "20%" }}>
            <h3>Search</h3>
            <form>
                <div className="input-container">
                    <label for="search-text">Search:</label>
                    <input id="search-text" type="text" required />
                </div>
                <div className="input-container">
                    <input id="search-submit" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}


export function Collection() {
    let searchResultsCount = 0 // TODO
    return (
        <div style={{ marginTop: "50px" }}>
            <h3>Collection</h3>
            <div id="search-results" style={{ margin: "20px" }}>
                <h4>Search Results:</h4>
                <span id="search-results-count">Results found: {searchResultsCount}</span>
                <table style={{ margin: "20px" }}>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Details</th>
                        <th>View</th>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>placeholder</td>
                        <td>placeholder</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}