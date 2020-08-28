import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadQuotationAction } from '../store/actions/actionsCreator';
import { getQuotation } from '../store/selectors/selector';
import Module from './module';

const Container = styled.div`
  margin: 20px 0;
`;

const QuotationCost = styled.div`
  margin-top: 20px;
`;

const Budget = ({ quotation, loadQuotation }) => {
  useEffect(() => {
    if (!quotation) {
      loadQuotation();
    }
  });

  return <Container>
    {
      quotation ?
        <div>
          { quotation.modules.map(module => 
            <Module key={module.id} module={module} />) }
          <QuotationCost>
            quotation cost = {quotation.quotationCost}
          </QuotationCost>
        </div>
        : 'Loading...'
    }


  </Container>
}

const mapStateToProps = state => {
  return {
    quotation: getQuotation(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadQuotation: () => dispatch(loadQuotationAction()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);