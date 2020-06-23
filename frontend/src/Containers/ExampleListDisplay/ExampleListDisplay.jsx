import React from "react"
import { connect } from "react-redux"
import { fetchListData, addListItem, deleteListItem } from "../../Actions/ExampleListActions";
import ExampleList from "../../Components/ExampleList";
import { LoadingStatus } from "../../Constants";

class ExampleListDisplay extends React.Component {

    componentDidMount() {
        this.props.fetchListData();
    }

    render() {
        const { loadingStatus, exampleListData, addListItem, deleteListItem } = this.props;

        switch (loadingStatus) {
            case LoadingStatus.LOADED:
                return (
                    <ExampleList
                        options={exampleListData}
                        onCreate={() => { addListItem({ text: "new" }) }}
                        onDelete={() => { deleteListItem(exampleListData[0].id) }}
                    />
                );
            case LoadingStatus.LOAD_ERROR:
                return (
                    <h1>failed to load list</h1>
                );

            case LoadingStatus.LOADING:
            default:
                return (
                    <h1>loading...</h1>
                );
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchListData: () => dispatch(fetchListData()),
    addListItem: (itemData) => dispatch(addListItem(itemData)),
    deleteListItem: (id) => dispatch(deleteListItem(id)),
});

const mapStateToProps = (state) => ({
    exampleListData: state.listData,
    loadingStatus: state.loadingStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(ExampleListDisplay);

//action (gauna duomenis, keičia duomenis) 
//reducer(apdoroti duomenis iš actionų: pridėti, ištrinti, perduoti informacija componentam, pvz loading state)
//connect (pasakyti kas atlieka actionus ir kas gauna apdorotą rezultatą reducerio)