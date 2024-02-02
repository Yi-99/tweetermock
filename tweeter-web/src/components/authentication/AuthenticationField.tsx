interface AuthenticationFieldProps {
  onAliasChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

const AuthenticationField: React.FC<AuthenticationFieldProps> = ({ onAliasChange, onPasswordChange }) => {

  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onChange={(event) => onAliasChange(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          onChange={(event) => onPasswordChange(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationField;