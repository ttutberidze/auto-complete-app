import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Autocomplete from "./index";
import {getData} from "../api/mock.";

test('render no data if incorrect string is passed', async () => {
  const renderRes = render(<Autocomplete filter={(text) => getData(text)}/>);
  fireEvent.change(screen.getByTestId("input"), {
    target: {value: "Appe"},
  });
  const loading = screen.getByTestId('loading');
  expect(loading).toBeInTheDocument();
  await waitFor(() => {
    expect(renderRes.queryByTestId('loading')).not.toBeInTheDocument()
  }, {timeout: 5000})
  const noData = renderRes.getByTestId('no-data');
  expect(noData).toBeInTheDocument();
});

test('render no data if correct string is passed', async () => {
  const filterMock = (text) => {
    return getData(text).then(res => res.map(item => ({value: item.id, label: item.title})));
  }
  const renderRes = render(<Autocomplete filter={filterMock}/>);
  fireEvent.change(renderRes.getByTestId("input"), {
    target: {value: "Bana"},
  });
  const loading = renderRes.getByTestId('loading');
  expect(loading).toBeInTheDocument();
  await waitFor(() => {
    expect(renderRes.queryByTestId('loading')).not.toBeInTheDocument()
  }, {timeout: 5000})
  const dropdown = renderRes.getByTestId('dropdown-list');
  expect(dropdown).toBeInTheDocument();
});

