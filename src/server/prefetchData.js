export default function(dispatch, components, params) {
  const needs = components.reduce((prev, current) => {
    return (current.prefetchData || [])
      .concat((current.WrappedComponent && (current.WrappedComponent.prefetchData !== current.prefetchData) ? current.WrappedComponent.prefetchData : []) || [])
      .concat(prev);
  }, []);
  return Promise.all(needs.map(need => dispatch(need(params))));
}