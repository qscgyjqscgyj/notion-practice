import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

const REQUEST_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
  observe: 'response',
};

export const withCredentialsInterceptor: HttpInterceptorFn = (
  request,
  next,
) => {
  const clonedReq = request.clone(REQUEST_OPTIONS);

  return next(clonedReq);
};
