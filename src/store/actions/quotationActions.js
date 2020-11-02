import {
  SELECT_QUOTATION
} from './actionsTypes.js';

import { FirebaseInstance } from '../../App';

export const selectQuotation = (quotationId) => {
  return dispatch => {
    return dispatch(
      {
        type: SELECT_QUOTATION,
        quotation: quotationId
      }
    )
  }
}

export const createQuotation = (quotation) => {
  return (dispatch, getSate) => {
    const quotationDetails = {
      "type": "Sponsor",
      "code": "PURE011",
      "status": "submitted",
      "startDate": "",
      "endDate": "",
    };

    const projectId = getSate().selectedProjectId; 
    FirebaseInstance.dataRef.ref(`projects/${projectId}/quotations`).push(quotationDetails).then((res) => {
      const id = res.path.pieces_[1];

    });


  }
}



