import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { WorkflowCardActions } from 'src/components/WorkflowCard/WorkflowCardActions';

describe('WorkflowCardActions Test', () => {
    afterEach(cleanup);
    it('WorkflowCardActions renders correctly', () => {
        const rendered = renderer.create(<WorkflowCardActions nextLabel="Next" previousLabel="Previous" />).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('renders the nextLabel correctly', () => {
        const nextLabel = 'Next';
        const { getByText } = render(<WorkflowCardActions nextLabel={nextLabel} previousLabel="Previous" showNext />);
        expect(getByText(nextLabel)).toBeTruthy();
    });

    it('renders the previousLabel correctly', () => {
        const previousLabel = 'Back';
        const { getByText } = render(
            <WorkflowCardActions previousLabel={previousLabel} nextLabel="Next" showPrevious />
        );
        expect(getByText(previousLabel)).toBeTruthy();
    });

    it('calls onNext when the Next button is clicked', () => {
        const onNext = jest.fn();
        const { getByTestId } = render(
            <WorkflowCardActions previousLabel={'Back'} nextLabel="Next" showPrevious showNext onNext={onNext} />
        );
        const nextButton = getByTestId('blui-workflow-card-actions-next-button');
        fireEvent.press(nextButton);
        expect(onNext).toHaveBeenCalledTimes(1);
    });

    it('calls onPrevious when the Previous button is clicked', () => {
        const onPrevious = jest.fn();
        const { getByTestId } = render(
            <WorkflowCardActions
                previousLabel={'Back'}
                nextLabel="Next"
                showPrevious
                showNext
                onPrevious={onPrevious}
            />
        );
        const previousButton = getByTestId('blui-workflow-card-actions-previous-button');
        fireEvent.press(previousButton);
        expect(onPrevious).toHaveBeenCalledTimes(1);
    });

    it('does not calls onPrevious when button is disabled', () => {
        const onPrevious = jest.fn();
        const { getByTestId } = render(
            <WorkflowCardActions
                previousLabel={'Back'}
                nextLabel="Next"
                showPrevious
                showNext
                canGoPrevious={() => false}
            />
        );
        const previousButton = getByTestId('blui-workflow-card-actions-previous-button');
        fireEvent.press(previousButton);
        expect(onPrevious).toHaveBeenCalledTimes(0);
    });

    it('does not calls onNext when button is disabled', () => {
        const onNext = jest.fn();
        const { getByTestId } = render(
            <WorkflowCardActions
                previousLabel={'Back'}
                nextLabel="Next"
                showPrevious
                showNext
                canGoNext={() => false}
            />
        );
        const nextButton = getByTestId('blui-workflow-card-actions-next-button');
        fireEvent.press(nextButton);
        expect(onNext).toHaveBeenCalledTimes(0);
    });
});
