import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Player from '../routes/Player';

import * as modalActions from '../actions/modal';
import { updateBeats } from '../actions/beats';

function mapStateToProps(state) {
    return {
        bpm            : state.config.bpm,
        beats          : state.beats,
        currentBuffer  : state.sound.currentSrc ? state.sound.currentSrc.buffer : undefined,
        instruments    : state.instruments,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...modalActions,
        updateBeats
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);