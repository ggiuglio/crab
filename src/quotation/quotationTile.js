import React from "react";
import { connect } from "react-redux";
import { selectQuotation } from "../store/actions/quotationActions";
import CustomNavLink from "../common/customNavLink";
import M from "materialize-css/dist/js/materialize.min.js";

const QuotationTile = ({ quotation, chooseQuotation, projectId }) => {
  React.useEffect(() => {
    if (quotation) {
      let fab = document.querySelectorAll(".fixed-action-btn");
      M.FloatingActionButton.init(fab, {
        direction: "left",
        hoverEnabled: false,
      });
    }
  }, []);

  const goToQuotationPage = () => {
    chooseQuotation(quotation.id);
  };

  return (
    <div className="col s12">
      <div className="card indigo lighten-2">
        <div className="card-content" onClick={() => goToQuotationPage()}>
          <div className="row card-text">
            <div className="col s11">
              <div className="row">
                <CustomNavLink
                  to={`/project/quotation?project=${projectId}&quotation=${quotation.id}`}
                  code="QTN"
                >
                  <span
                    className="bolder col s12 m7 s-center truncate white-text"
                    title={quotation.code}
                  >
                    {quotation.code}
                  </span>
                  <span
                    className="col s12 m4 text-right s-center price truncate white-text"
                    title={quotation.quotationCost}
                  >
                    {quotation.quotationCost}
                  </span>
                </CustomNavLink>
                <span className="col s12 m1 s-center tooltip m-space-up">
                  <span className="tooltiptext">{quotation.status}</span>
                  {quotation.status.toLowerCase() === "open" ? (
                    <i className="material-icons amber-text">lock_open</i>
                  ) : (
                    <i className="material-icons brown-text text-darken-3">
                      lock
                    </i>
                  )}
                </span>
              </div>
            </div>
            <div className="col s1 card-action-btn relative">
              <div>
                <div className="fixed-action-btn absolute">
                  <a
                    className="btn-floating btn-small orange darken-4"
                    href="#!"
                  >
                    <i className="material-icons">menu</i>
                  </a>
                  <ul>
                    <li
                      key={"liarc_" + quotation.id}
                      className="tooltip relative"
                    >
                      <a
                        className="btn-floating btn-small red darken-1 modal-trigger"
                        href="#modal-archive"
                      >
                        <i className="material-icons">archive</i>
                      </a>
                      <span className="tooltiptext bottom">Archive</span>
                    </li>
                    <li
                      key={"liedit_" + quotation.id}
                      className="tooltip relative"
                    >
                      <CustomNavLink
                        className="btn-floating btn-small yellow darken-1"
                        to="#"
                        iconType="MATERIAL"
                        iconName="edit"
                        code="QTN"
                      />
                      <span className="tooltiptext bottom">Edit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseQuotation: (quotationId) => dispatch(selectQuotation(quotationId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationTile);
