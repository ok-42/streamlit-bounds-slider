import os

import streamlit.components.v1 as components

_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        'bounds_slider',
        url='http://localhost:3001',)
else:
    _parent_dir = os.path.dirname(os.path.abspath(__file__))
    _build_dir = os.path.join(_parent_dir, 'frontend/build')
    _component_func = components.declare_component(
        'bounds_slider',
        path=_build_dir)


def bounds_slider(
        label: str,
        value: float | None,
        bounds: tuple[float, float],
        step: float,
        use_checkbox: bool = False,
        is_single: bool = False,
        initial_bounds: tuple[float, float] = None,
        tooltip: str = '',
        key=None
) -> list[float]:
    """Create a slider with three thumbs: a value and its lower and upper bounds.

    :param label: slider label
    :param value: initial value
    :param bounds: min and max values for the slider
    :param step: stepping interval
    :param use_checkbox: if True, adds a checkbox that toggles 2 or 3 thumbs
    :param is_single: if True, makes one thumb instead of three
    :param initial_bounds: optional; values within bounds parameter
    :param tooltip: tooltip that appears next to slider
    :param key: Streamlit key
    :return: lower bound, current value, upper bound
    """

    lower_bound, upper_bound = bounds
    lower_bound_init, upper_bound_init = initial_bounds or bounds
    assert lower_bound <= lower_bound_init <= upper_bound_init <= upper_bound

    # Two-sided slider
    if value is None:
        default = [lower_bound_init, upper_bound_init]

    # Slider with one or three thumbs
    else:
        if is_single:
            default = [value]
        else:
            default = [lower_bound_init, value, upper_bound_init]

    component_value = _component_func(
        label=label,
        value=value,
        lower_bound=lower_bound,
        upper_bound=upper_bound,
        use_checkbox=use_checkbox,
        step=step,
        help=tooltip,
        key=key,
        default=default)

    return component_value


if not _RELEASE:
    import streamlit as st

    st.set_page_config(
        page_title='Test custom slider',
        layout='wide')

    default_slider = st.slider(
        label='Default slider',
        value=[10, 50],
        step=2,
        help='Help on slider')

    st.markdown('---')

    one_thumb = bounds_slider(
        label='One',
        value=10,
        bounds=(0, 20),
        step=1,
        is_single=True)

    two_thumbs = bounds_slider(
        label='Two',
        value=None,
        bounds=(0, 20),
        initial_bounds=(0, 15),
        step=1,)

    three_thumbs = bounds_slider(
        label='Three thumbs',
        value=40,
        bounds=(10, 50),
        initial_bounds=(20, 45),
        step=1)

    two_or_three_thumbs = bounds_slider(
        label='Slider with checkbox',
        value=35,
        bounds=(10, 50),
        initial_bounds=(20, 40),
        step=1,
        use_checkbox=True,
        tooltip='Mark checkbox to enable third thumb')
