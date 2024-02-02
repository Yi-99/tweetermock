import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface OAuthServices {
  display: (value:string) => void;
}

const OAuth: React.FC<OAuthServices> = ({ display }) => {
  return (
    <>
      <div className="text-center mb-3">
        <button
          type="button"
          className="btn btn-link btn-floating mx-1"
          onClick={() =>
            display("Google registration is not implemented.")
          }
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="googleTooltip">Google</Tooltip>}
          >
            <FontAwesomeIcon icon={["fab", "google"]} />
          </OverlayTrigger>
        </button>

        <button
          type="button"
          className="btn btn-link btn-floating mx-1"
          onClick={() =>
            display(
              "Facebook registration is not implemented."
            )
          }
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="facebookTooltip">Facebook</Tooltip>}
          >
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </OverlayTrigger>
        </button>

        <button
          type="button"
          className="btn btn-link btn-floating mx-1"
          onClick={() =>
            display("Twitter registration is not implemented.")
          }
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="twitterTooltip">Twitter</Tooltip>}
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </OverlayTrigger>
        </button>

        <button
          type="button"
          className="btn btn-link btn-floating mx-1"
          onClick={() =>
            display(
              "LinkedIn registration is not implemented."
            )
          }
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="linkedInTooltip">LinkedIn</Tooltip>}
          >
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </OverlayTrigger>
        </button>

        <button
          type="button"
          className="btn btn-link btn-floating mx-1"
          onClick={() =>
            display("Github registration is not implemented.")
          }
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="githubTooltip">GitHub</Tooltip>}
          >
            <FontAwesomeIcon icon={["fab", "github"]} />
          </OverlayTrigger>
        </button>
      </div>
    </>
  )
}

export default OAuth;

