# Need to update paths
# Aliases:
# `a` - activate venv
# `da` - deactivate
# `pi` - pip install
alias build_js='cd ~/projects/bounds_slider/bounds_slider/frontend && npm run build'
alias build_py='cd ~/projects/bounds_slider && a && python setup.py sdist bdist_wheel && da'
alias whl_copy='cp ~/projects/bounds_slider/dist/streamlit_bounds_slider-0.0.1-py3-none-any.whl ~/projects/dash/'
alias whl_install='cd ~/projects/dash && a && pip uninstall streamlit-bounds-slider -y && pi streamlit_bounds_slider-0.0.1-py3-none-any.whl && da'
alias make='build_js && build_py && whl_copy && whl_install'
alias run='a && streamlit run ~/projects/dash/app/main.py'
