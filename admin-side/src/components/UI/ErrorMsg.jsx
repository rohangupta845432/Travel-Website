const ErrorMsg = ({ message }) => {
  return (
    <div className="alert alert-dark" role="alert">
      {message}
    </div>
  );
};

export default ErrorMsg;
